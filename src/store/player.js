import { reactive } from 'vue'
import clamp from 'lodash/clamp'
import { store } from './index'
import { emit, log, mixin, deserializeObject } from '@/utils'
import Item from '@/classes/items/item'
import Name from '@/mixins/name'
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Xp from '@/mixins/xp'
import Credits from '@/mixins/credits'
import Items from '@/mixins/items'
import Carry from '@/mixins/carry'

export default class Player {
  storeName = 'player'

  constructor() {
    this._mixinState = { ...this.state }
    this.state = reactive({ ...this._mixinState, ...this.defaultState })
    setInterval(() => this.processBuffs(), 1000)
  }

  get defaultState() {
    return {
      name: 'You',
      hp: this.maxHp,
      xp: 0,
      str: store.config.baseStr,
      dex: store.config.baseDex,
      int: store.config.baseInt,
      rolls: this.maxRolls,
      // maximum ram space available to install softwares
      ram: store.config.baseRam,
      // maximum disk space available to store files in inventory
      disk: store.config.baseDisk,
      // currently connected server
      serverId: null,
      // current dialog being displayed
      dialogId: null,
      // current combat being displayed
      combatId: null,
      dice: this.baseDice,
    }
  }

  get str() { return this.state.str + this.sumOfBuffs('str') }
  set str(value) { this.state.str = value }

  get dex() { return this.state.dex + this.sumOfBuffs('dex') }
  set dex(value) { this.state.dex = value }

  get int() { return this.state.int + this.sumOfBuffs('int') }
  set int(value) { this.state.int = value }

  get rolls() { return this.state.rolls }
  set rolls(value) { this.state.rolls = clamp(value, 0, this.maxRolls) }
  get maxRolls() {
    return Math.floor(store.config.baseRolls + (0.25 * this.lvl)) + this.sumOfBuffs('roll')
  }

  get items() { return store.items.list.filter(i => i.locationStore === this.storeName) }

  get installedSoftwares() { return this.items.filter(i => i.isSoftware && i.isInstalled) }
  get files() { return this.items.filter(i => i.isFile) }

  get ram() { return this.state.ram + this.sumOfBuffs('ram') }
  set ram(value) { this.state.ram = value }
  get ramFree() { return this.state.ram - this.ramUsed }
  get ramUsed() { return this.installedSoftwares .reduce((acc, i) => acc + i.weight, 0) }

  get disk() { return this.state.disk + this.sumOfBuffs('disk') }
  set disk(value) { this.state.disk = value }
  get diskFree() { return this.state.disk - this.diskUsed }
  get diskUsed() { return this.files.reduce((acc, i) => acc + i.weight, 0) }

  get installedViewer() { return this.installedSoftware(i => i.isViewer) }
  get installedDecrypter() { return this.installedSoftware(i => i.isDecrypter) }
  get installedCracker() { return this.installedSoftware(i => i.isCracker) }
  get installedFtp() { return this.installedSoftware(i => i.isFtp) }
  get installedDeleter() { return this.installedSoftware(i => i.isDeleter) }

  get serverId() { return this.state.serverId }
  set serverId(value) { this.state.serverId = value }

  get server() { return store.items.get(this.serverId) }
  set server(value) {
    if (value) {
      this.state.serverId = value.id
    } else {
      this.state.serverId = null
    }
  }

  get isConnectedToServer() { return !!this.server }

  get isInDialog() { return !!this.dialog }

  get dialogId() { return this.state.dialogId }
  set dialogId(value) { this.state.dialogId = value }

  get dialog() { return store.dialogs.get(this.dialogId) }
  set dialog(value) {
    if (value) {
      this.state.dialogId = value.id
    } else {
      this.state.dialogId = null
    }
  }

  get isInCombat() { return !!this.combat }

  get combatId() { return this.state.combatId }
  set combatId(value) { this.state.combatId = value }

  get combat() { return store.combats.get(this.combatId) }
  set combat(value) {
    if (value) {
      this.state.combatId = value.id
    } else {
      this.state.combatId = null
    }
  }

  get dice() { return this.state.dice }
  set dice(value) { this.state.dice = value }
  get maxDice() { return Math.floor(store.config.baseDice + (0.25 * this.lvl)) + this.sumOfBuffs('dice') }

  get baseDice() {
    return new Array(this.maxDice).fill(0).map(() => (
      { faces: store.config.battleDice, value: 1 }
    ))
  }

  get shieldDice() {
    return this.dice.filter(d => store.config.battleDice[d.value - 1].value === 'D')
  }
  get shieldDiceIndexes() {
    return this.shieldDice.map(d => this.dice.indexOf(d))
  }

  async reset() {
    Object.keys(this._mixinState).forEach(k => {
      this.state[k] = this._mixinState[k]
    })
    Object.keys(this.defaultState).forEach(k => {
      this.state[k] = this.defaultState[k]
    })
  }

  hasInstalledSoftwareOfType(type) {
    return this.installedSoftwares.find(i => i.installType === type)
  }

  installedSoftware(expr) {
    return this.installedSoftwares.find(i => expr.call(this, i))
  }

  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    if (data instanceof Item) {
      data.locationId = null
      data.locationStore = this.storeName
      data.hovered = false
      store.items.update(data)
      return data
    } else {
      const i = new Item(data)
      i.locationId = null
      i.locationStore = this.storeName
      i.hovered = false
      store.items.update(i)
      return i
    }
  }

  canAnswer(showMessage) {
    if (!this.isInDialog) {
      if (showMessage) {
        log('You are not talking to anyone')
      }
      return false
    }
    return true
  }

  /**
   * Respond with an answer to the current dialog
   *
   * @param code
   * @returns {Promise<void>}
   */
  async answer(code) {
    if (!this.canAnswer(true)) {
      return false
    }
    return this.dialog.answer(code)
  }

  canLevelUp(showMessage) {
    if (this.xp < this.nextXp) {
      if (showMessage) {
        log('You cannot level up just yet. Not enough experience')
      }
      return false
    }
    return true
  }

  async levelUp() {
    if (!this.canLevelUp(true)) {
      return false
    }
    store.player.lvl += 1
    await emit.call(this, 'onLevelUp')
  }

  async onLevelUp() {}

  deserialize() {
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
