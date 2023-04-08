import { reactive } from 'vue'
import { emit, mixin, deserializeObject, can, AnyData } from '@/utils'
import { Entity, State } from '@/entity'
import { IName, Name } from '@/mixins/name'
import { ILevel, Level } from '@/mixins/level'
import { IBuffable, Buffable } from '@/mixins/buffable'
import { IHp, Hp } from '@/mixins/hp'
import { IXp, Xp } from '@/mixins/xp'
import { ICredits, Credits } from '@/mixins/credits'
import { IItems, Items } from '@/mixins/items'
import { ICarry, Carry } from '@/mixins/carry'
import { Slots } from '@/mixins/equipable'
import { Item } from '@/classes/items/item'
import { Combat } from '@/classes/combat'
import { IDie } from '@/store/config'
import { Software } from '@/classes/softwares/software'
import { File } from '@/classes/server/file'
import { Dialog } from '@/classes/dialog'
import { Server } from '@/classes/server/server'
import { Cracker } from '@/classes/softwares/cracker'
import { Ftp } from '@/classes/softwares/ftp'
import { Deleter } from '@/classes/softwares/deleter'
import { Decrypter } from '@/classes/softwares/decrypter'
import { Viewer } from '@/classes/softwares/viewer'

export interface Player extends
  IName,
  ILevel,
  IBuffable,
  IHp,
  IXp,
  ICredits,
  IItems,
  ICarry
{}

export class Player {
  _mixinState: State

  storeName = 'player'

  constructor() {
    this._mixinState = { ...this.state }
    this.state = reactive<State>({ ...this._mixinState, ...this.defaultState })
    setInterval(() => this.processBuffs(), 1000)
  }

  get defaultState(): State {
    return {
      name: 'You',
      hp: this.maxHp,
      xp: 0,
      str: window.store?.config.baseStr,
      dex: window.store?.config.baseDex,
      int: window.store?.config.baseInt,
      rolls: this.maxRolls,
      // maximum ram space available to install softwares
      ram: window.store?.config.baseRam,
      // maximum disk space available to store files in inventory
      disk: window.store?.config.baseDisk,
      // currently connected server
      serverId: null,
      // current dialog being displayed
      dialogId: null,
      // current combat being displayed
      combatId: null,
      dice: this.baseDice,
      // is the player travelling between buildings?
      travelling: false,
    }
  }

  get isPlayer(): boolean { return true }

  get str(): number { return this.state.str + this.sumOfBuffs('str') }
  set str(value) { this.state.str = value }

  get dex(): number { return this.state.dex + this.sumOfBuffs('dex') }
  set dex(value) { this.state.dex = value }

  get int(): number { return this.state.int + this.sumOfBuffs('int') }
  set int(value) { this.state.int = value }

  get levelUpPoints(): number { return this.lvl + Math.ceil(this.lvl * 0.25) }

  get rolls(): number { return this.state.rolls }
  set rolls(value) { this.state.rolls = Math.max(0, value) }
  get maxRolls(): number {
    return Math.floor(window.store?.config.baseRolls + (0.25 * this.lvl)) + this.sumOfBuffs('roll')
  }

  get items(): Item[] {
    return window.store?.items.list.filter(i => i.locationStore === this.storeName)
  }

  get equippedItems(): Item[] {
    return window.store?.items.list.filter(i => i.locationStore === this.storeName && i.isEquipped)
  }

  get installedSoftwares(): Software[] {
    return this.items.filter((i: any) => i.isSoftware && i.isInstalled) as Software[]
  }
  get files(): File[] { return this.items.filter((i: any) => i.isFile) as File[] }

  get ram(): number { return this.state.ram + this.sumOfBuffs('ram') }
  set ram(value) { this.state.ram = value }
  get ramFree(): number { return this.state.ram - this.ramUsed }
  get ramUsed(): number { return this.installedSoftwares .reduce((acc, i) => acc + i.weight, 0) }

  get disk(): number { return this.state.disk + this.sumOfBuffs('disk') }
  set disk(value) { this.state.disk = value }
  get diskFree(): number { return this.state.disk - this.diskUsed }
  get diskUsed(): number { return this.files.reduce((acc, i) => acc + i.weight, 0) }

  get installedViewer(): Viewer | undefined {
    return this.installedSoftware(i => i.isViewer) as Viewer | undefined
  }
  get installedDecrypter(): Decrypter | undefined {
    return this.installedSoftware(i => i.isDecrypter) as Decrypter | undefined
  }
  get installedCracker(): Cracker | undefined {
    return this.installedSoftware(i => i.isCracker) as Cracker | undefined
  }
  get installedFtp(): Ftp | undefined {
    return this.installedSoftware(i => i.isFtp) as Ftp | undefined
  }
  get installedDeleter(): Deleter | undefined {
    return this.installedSoftware(i => i.isDeleter) as Deleter | undefined
  }

  get serverId(): string | null { return this.state.serverId }
  set serverId(value) { this.state.serverId = value }

  get server(): Server | undefined { return window.store?.items.get(this.serverId) as Server | undefined }
  set server(value: Server | undefined | null) {
    if (value) {
      this.serverId = value.id
    } else {
      this.serverId = null
    }
  }

  get isConnectedToServer(): boolean { return !!this.server }

  get isInDialog(): boolean { return !!this.dialog }

  get dialogId(): string | null { return this.state.dialogId }
  set dialogId(value) { this.state.dialogId = value }

  get dialog(): Dialog | undefined { return window.store?.dialogs.get(this.dialogId) }
  set dialog(value: Dialog | undefined | null) {
    if (value) {
      this.dialogId = value.id
    } else {
      this.dialogId = null
    }
  }

  get isInCombat(): boolean { return !!this.combat }

  get combatId(): string | null { return this.state.combatId }
  set combatId(value) { this.state.combatId = value }

  get combat(): Combat | undefined { return window.store?.combats.get(this.combatId) }
  set combat(value: Combat | undefined | null) {
    if (value) {
      this.combatId = value.id
    } else {
      this.combatId = null
    }
  }

  get dice(): IDie[] {
    if (this.state.dice.length !== this.maxDice) {
      this.state.dice = this.baseDice
    }
    return this.state.dice
  }
  set dice(value) { this.state.dice = value }

  get maxDice(): number {
    return Math.floor(window.store?.config.baseDice + (0.25 * this.lvl)) + this.sumOfBuffs('dice')
  }

  get baseDice(): IDie[] {
    return new Array(this.maxDice)
      .fill(0)
      .map(() => ({ faces: window.store?.config.battleDice, value: 1 }))
  }

  get shieldDice(): IDie[] {
    return this.dice.filter(d => window.store?.config.battleDice[d.value - 1].value === 'D')
  }
  get shieldDiceIndexes(): number[] {
    return this.shieldDice.map(d => this.dice.indexOf(d))
  }

  get extraShieldDice(): IDie[] {
    const defIndex = window.store?.config.battleDice.findIndex(d => d.value === 'D')
    return new Array(this.sumOfBuffs('shield')).fill(0).map(() => (
      { faces: window.store?.config.battleDice, value: defIndex + 1 }
    ))
  }
  get extraShieldDiceIndexes(): number[] {
    return this.extraShieldDice.map((d, index) => index)
  }

  get extraSwordDice(): IDie[] {
    const defIndex = window.store?.config.battleDice.findIndex(d => d.value === 'A')
    return new Array(this.sumOfBuffs('sword')).fill(0).map(() => (
      { faces: window.store?.config.battleDice, value: defIndex + 1 }
    ))
  }
  get extraSwordDiceIndexes(): number[] {
    return this.extraSwordDice.map((d, index) => index)
  }

  get isTravelling(): boolean { return this.state.travelling }
  set travelling(value: boolean) { this.state.travelling = value }

  async reset(): Promise<void> {
    Object.keys(this._mixinState).forEach(k => {
      this.state[k] = this._mixinState[k]
    })
    Object.keys(this.defaultState).forEach(k => {
      this.state[k] = this.defaultState[k]
    })
  }

  hasInstalledSoftwareOfType(type?: string | null): Software | undefined {
    return this.installedSoftwares.find(i => i.installType === type)
  }

  installedSoftware(expr: (item: any) => boolean): Software | undefined {
    return this.installedSoftwares.find(i => expr.call(this, i))
  }

  equippedInSlot(slot: Slots): Item | undefined {
    return this.equippedItems.find(i => i.equipSlot === slot)
  }

  addItem(data: (Item | AnyData)[] | Item | AnyData): Item[] | Item {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d) as Item)
    }

    if (data instanceof Entity) {
      data.locationId = null
      data.locationStore = this.storeName
      data.hovered = false
      window.store?.items.update(data)
      return data
    } else {
      const i = new Item(data)
      i.locationId = null
      i.locationStore = this.storeName
      i.hovered = false
      window.store?.items.update(i)
      return i
    }
  }

  canAnswer(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isInDialog,
        log: () => 'You are not talking to anyone'
      },
    ], showMessage)
  }

  /**
   * Respond with an answer to the current dialog
   *
   * @param code
   * @returns {Promise<void>}
   */
  async answer(code: string): Promise<boolean> {
    if (!this.canAnswer(true)) {
      return false
    }
    return this.dialog?.answer(code) || false
  }

  canLevelUp(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.xp < this.nextXp,
        log: () => 'You cannot level up just yet. Not enough experience'
      },
    ], showMessage)
  }

  async levelUp(): Promise<boolean> {
    if (!this.canLevelUp(true)) {
      return false
    }
    this.lvl += 1
    this.hp = this.maxHp
    await emit(this, 'onLevelUp')
    window.store.game.showLevelUp = true
    return true
  }

  async onLevelUp(): Promise<void> {}

  deserialize(): any {
    return deserializeObject(this.state)
  }
}

mixin(Player, [
  Name,
  Level,
  Buffable,
  Credits,
  Items,
  Hp,
  Xp,
  Carry,
])
