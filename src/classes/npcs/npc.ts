import compact from 'lodash/compact'
import { Entity, SetupData } from '@/entity'
import { Dialog } from '@/classes/dialog'
import { Combat } from '@/classes/combat'
import { AnyData, can, emit, mixin, registerClass } from '@/utils'
import { ICode, Code, ICodeSetupData } from '@/mixins/code'
import { IName, INameSetupData, Name } from '@/mixins/name'
import { IDescription, Description, IDescriptionSetupData } from '@/mixins/description'
import { IActions, Actions, IDropdownItem, IActionsSetupData } from '@/mixins/actions'
import { IImage, IImageSetupData, Image } from '@/mixins/image'
import { IHovered, Hovered, IHoveredSetupData } from '@/mixins/hovered'
import { ILocation, ILocationSetupData, Location } from '@/mixins/location'
import { ILevel, ILevelSetupData, Level } from '@/mixins/level'
import { IBuffable, Buffable, IBuffableSetupData } from '@/mixins/buffable'
import { IHp, Hp, IHpSetupData } from '@/mixins/hp'
import { ICredits, Credits, ICreditsSetupData } from '@/mixins/credits'
import { IItems, IItemsSetupData, Items } from '@/mixins/items'
import { ICarry, Carry, ICarrySetupData } from '@/mixins/carry'
import { IRequirements, IRequirementsSetupData, Requirements } from '@/mixins/requirements'
import { ISleep, ISleepSetupData, Sleep } from '@/mixins/sleep'
import { ITooltip, ITooltipSetupData, Tooltip } from '@/mixins/tooltip'
import { IDie } from '@/store/config'

export interface Agenda {
  date: string
  start: string
  end: string
  roomId?: string | null
  roomCode?: string | null
  expr: (npc: Npc, end: boolean) => Promise<void>
}

export interface INpcSetupData extends
  ICodeSetupData,
  INameSetupData,
  IDescriptionSetupData,
  IActionsSetupData,
  IImageSetupData,
  IHoveredSetupData,
  ILocationSetupData,
  ICreditsSetupData,
  IItemsSetupData,
  ILevelSetupData,
  IBuffableSetupData,
  IHpSetupData,
  ICarrySetupData,
  IRequirementsSetupData,
  ISleepSetupData,
  ITooltipSetupData
{
  // is the Npc female or male?
  female?: boolean
  // can we talk to this Npc?
  talkable?: boolean
  // have we met this Npc before?
  known?: boolean
  // is the Npc aggresive towards us?
  aggresive?: boolean
  // fixed set of dice
  dice?: IDie[]
  color?: string | null
  firstname?: string | null
  lastname?: string | null
  nickname?: string | null
  age?: number
  eyeColor?: string | null
  hairColor?: string | null
  skinColor?: string | null
  build?: string | null
  size?: string | null
  strength?: string | null
  status?: string | null
  mood?: string | null
  motives?: string | null
  mind?: string | null
  trait?: string | null
  job?: string | null
  jobLevel?: string | null
  jobDomain?: string | null
  buildAdv?: string | null
  sizeAdv?: string | null
  strengthAdv?: string | null
  statusAdv?: string | null
  moodAdv?: string | null
  mindAdv?: string | null
}

export interface Npc extends
  ICode,
  IName,
  IDescription,
  IActions,
  IImage,
  IHovered,
  ILocation,
  ICredits,
  IItems,
  ILevel,
  IBuffable,
  IHp,
  ICarry,
  IRequirements,
  ISleep,
  ITooltip
{}

export class Npc extends Entity {
  constructor(data?: INpcSetupData) {
    super(data)
  }

  setupInstance(data?: INpcSetupData): SetupData | undefined {
    const { locationId, locationStore } = this.setupLocation(data as SetupData)

    return super.setupInstance({
      name: 'Npc',
      hp: this.maxHp,
      talkable: false,
      known: false,
      aggresive: false,
      female: false,
      locationId,
      locationStore,
      dice: this.baseDice,
      actions: [
        (item: Npc): IDropdownItem | undefined => (
          {
            label: 'Talk',
            key: 'talk',
            icon: 'talk',
            disabled: !item.canTalk(),
            click: item.talk,
          }
        ),
        (item: Npc): IDropdownItem | undefined => (
          {
            label: 'Combat',
            key: 'combat',
            icon: 'combat',
            disabled: !item.canCombat(),
            click: item.combat,
          }
        ),
      ],
      // Agenda to follow
      // { start: '08:00', end: '16:00', roomId: 'id', expr: (npc, end?) => void },
      // { start: '16:01', end: '07:59', roomCode: 'Home', expr: (npc, end?) => void },
      // { date: '2157-03-01', start: '14:00', end: '20:00', roomCode: 'SpecialRoom', expr: (npc, end?) => void },
      agenda: [] as Agenda[],
      // turns to skip during battle
      skipTurns: 0,
      ...(data || {})
    }) as INpcSetupData
  }

  get isNpc(): boolean { return true }

  get name(): string { return this.isKnown ? this.state.name : '???' }
  get description(): string { return this.isKnown ? this.state.description : '???' }

  get female(): boolean { return this.state.female }
  set female(value) { this.state.female = value }

  get iconSuffix(): string {
    return compact([this.state.iconSuffix, this.female ? 'female' : 'male']).join('-')
  }
  set iconSuffix(value: string | null) { this.state.iconSuffix = value }

  get maxHp(): number {
    return Math.floor(
      (this.baseHp + (this.highestHp - this.baseHp) * this.lvl / this.highestLvl) * 0.5
    )
  }

  get isKnown(): boolean { return this.state.known }
  set known(value: boolean) { this.state.known = value }

  get items() { return window.store.items.list.filter(i => i.location === this) }

  get dialogs(): Dialog[] { return window.store.dialogs.list.filter(d => d.npc === this) }

  get isTalkable(): boolean { return this.state.talkable }
  set talkable(value: boolean) { this.state.talkable = value }

  get isAggresive(): boolean { return this.state.aggresive }
  set aggresive(value: boolean) { this.state.aggresive = value }

  get dice(): IDie[] {
    const diff = this.state.dice.length - this.maxDice
    if (diff > 0) {
      this.state.dice = [
        ...(this.state.dice || []),
        ...window.store.config.randomDice(diff, window.store.config.npcBattleDice, ['_']),
      ]
    }
    if (diff < 0) {
      let x = diff
      while (x < 0) {
        this.state.dice.pop()
        x += 1
      }
    }
    return this.state.dice
  }
  set dice(value) { this.state.dice = value }

  get maxDice(): number { return Math.floor(window.store.config.baseDice + (0.25 * this.lvl)) }

  get skipTurns(): number { return this.state.skipTurns }
  set skipTurns(value) { this.state.skipTurns = value }

  get baseDice(): IDie[] {
    const { npcBattleDice } = window.store.config
    const atkIndex = npcBattleDice.findIndex(d => d.value === 'A') + 1
    const dice = window.store.config.randomDice(this.maxDice - 1, npcBattleDice, ['_'])
    // make sure has at least on ATTACK die
    dice.push({ faces: npcBattleDice, value: atkIndex })
    return dice.sort((a, b) => (
      a.value < b.value ? -1 : 1
    ))
  }

  get swordDice() {
    return this.dice.filter(d => window.store.config.npcBattleDice[d.value - 1].value === 'A')
  }
  get swordDiceIndexes() {
    return this.swordDice.map(d => this.dice.indexOf(d))
  }

  get shieldDice() {
    return this.dice.filter(d => window.store.config.npcBattleDice[d.value - 1].value === 'D')
  }
  get shieldDiceIndexes(): number[] {
    return this.shieldDice.map(d => this.dice.indexOf(d))
  }

  get agenda(): Agenda[] { return this.state.agenda }
  set agenda(value) { this.state.agenda = value }

  getDialog(code: string): Dialog | undefined { return this.dialogs.find(d => d.code === code) }

  get startingDialog(): Dialog | undefined { return this.getDialog('start') }

  addDialog(data: Dialog[] | AnyData[] | Dialog | AnyData): Dialog[] | Dialog {
    if (Array.isArray(data)) {
      return data.map(d => this.addDialog(d) as Dialog)
    }

    if (data instanceof Dialog) {
      data.npc = this
      window.store.dialogs.update(data as any)
      data.setupAnswers()
      return data
    } else {
      const i = new Dialog(data)
      i.npc = this
      window.store.dialogs.update(i as any)
      i.setupAnswers()
      return i
    }
  }

  canTalk(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isTalkable,
        log: () => `${this.nameProper} is not interested in talking to you`
      },
      { expr: () => window.store.player.isInDialog,
        log: () => `You are already in discussion with ${this.nameDisplay}`
      },
      { expr: () => window.store.player.isInCombat,
        log: () => `You cannot talk to ${this.nameDisplay} while in combat with ${window.store.player.combat?.npc?.nameDisplay}`
      },
      { expr: () => window.store.player.isConnectedToServer,
        log: () => `Disconnect from ${window.store.player.server?.nameDisplay} first`
      },
    ], showMessage, 'talk')
  }

  async talk(): Promise<boolean> {
    if (!this.canTalk(true)) {
      return false
    }
    window.store.player.dialog = this.startingDialog
    await emit(this, 'onTalk')
    return true
  }

  async onTalk(): Promise<void> {}

  canSay(code: string, showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.getDialog(code),
        log: () => `Could not find a valid dialog entry with the code ${code}`
      },
    ], showMessage)
  }

  async say(code: string): Promise<boolean> {
    if (!this.canSay(code, true)) {
      return false
    }
    const dialog = this.getDialog(code)
    return dialog ? dialog.say() : false
  }

  async onSay(dialog: Dialog): Promise<void> {}

  async onAnswer(dialog: Dialog, code: string): Promise<void> {}

  async onBye(): Promise<void> {}

  canCombat(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => window.store.player.isInDialog,
        log: () => `You are already in discussion with ${window.store.player.dialog?.npc?.nameProper}`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => `You are already in combat with ${window.store.player.combat?.npc?.nameProper}`
      },
      {
        expr: () => !this.isAggresive,
        log: () => `${this.nameProper} is not aggresive towards you, there are no reasons for conflict`
      },
      {
        expr: () => this.isDead,
        log: () => `${this.nameProper} is dead, you cannot fight`
      },
    ], showMessage)
  }

  async combat(): Promise<boolean> {
    if (!this.canCombat(true)) {
      return false
    }
    window.store.player.combat = window.store.combats.update(new Combat({ npcId: this.id })) as Combat
    if (!(await window.store.player.combat.startCombat())) {
      window.store.player.combat.remove()
      window.store.player.combat = null
    }
    return true
  }

  canMove(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.isSleeping,
        log: () => `${this.nameProper} is sleeping, therefore cannot move`
      },
      {
        expr: () => window.store.player.isInCombat && window.store.player.combat?.npc === this,
        log: () => `${this.nameProper} cannot move while in combat`
      },
      {
        expr: () => window.store.player.isInDialog && window.store.player.dialog?.npc === this,
        log: () => `${this.nameProper} cannot move while in discussion`
      },
    ], showMessage)
  }
}

mixin(Npc, [
  Code,
  Name,
  Description,
  Actions,
  Image,
  Hovered,
  Location,
  Credits,
  Items,
  Level,
  Buffable,
  Hp,
  Carry,
  Requirements,
  Sleep,
  Tooltip,
])

registerClass(Npc)
