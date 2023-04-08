import { reactive } from 'vue'
import random from 'lodash/random'

export interface IDieFace {
  value: string
  icon: string
}

export type DieFaces = IDieFace[]

export interface IDie {
  faces: DieFaces
  value: number
}

export type Dice = IDie[]
export type DiceIndexes = number[]

export class Config {
  storeName = 'config'

  state = reactive({
    // World

    startDate: '2157-01-01',
    startTime: '18:00',
    tickTime: 15,
    tickInterval: 60 * 1000,
    startCityCode: 'TestCity',

    // Travelling

    travelTime: 5000,

    // Player

    baseHp: 10,
    baseStr: 1,
    baseDex: 1,
    baseInt: 1,
    baseDice: 5,
    baseRolls: 3,
    highestHp: 100,
    highestLvl: 50,
    baseRam: 100,
    baseDisk: 1000,

    // Minimap

    // minimap room size in pixels
    minimapRoomSize: 32,
    // minimap margins
    minimapMargins: 8,

    // Logs

    // number of buffered lines in the log
    logSize: 100,

    // Server

    // number of buffered lines in server log
    serverLogSize: 50,
    // speed at which the server log characters are process in buffers
    serverSpeed: 25,
    // file, software and server operation base delay time
    operationBaseDelay: 1500,
    // maximum file size allowed to be randomly generated
    maxFileSize: 1000,
    // dummy file types to be randomly generated
    dummyFileTypes: ['doc', 'qrt', 'rpt', 'cod', 'hdr', 'tab', 'dum', 'unk'],

    // Dice

    // battle dice faces
    battleDice: [
      { value: 'A', icon: 'sword' }, // SWORD
      { value: 'D', icon: 'shield' }, // SHIELD
      { value: 'H', icon: 'heart' }, // HEART
      { value: 'B', icon: 'bomb' }, // BOMB
      { value: 'X', icon: 'fire' }, // SHIELD BUSTER
      { value: '_', icon: '' }, // BLANK
    ] as DieFaces,

    // Npc battle dice
    npcBattleDice: [
      { value: 'A', icon: 'sword' }, // SWORD
      { value: 'D', icon: 'shield' }, // DEFEND
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
    ] as DieFaces,

    // Combat

    // number of XP per NPC level when winning a combat
    combatXP: 100,
  })

  get startDate(): string { return this.state.startDate }
  get startTime(): string { return this.state.startTime }
  get tickTime(): number { return this.state.tickTime }
  get tickInterval(): number { return this.state.tickInterval }
  get startCityCode() { return this.state.startCityCode }

  get travelTime(): number {
    if (localStorage.getItem('DEV_MODE') === 'true') {
      return 500
    }
    return this.state.travelTime
  }

  get baseHp(): number { return this.state.baseHp }
  get highestHp(): number { return this.state.highestHp }
  get highestLvl(): number { return this.state.highestLvl }

  get baseDice(): number { return this.state.baseDice }
  get baseRolls(): number { return this.state.baseRolls }
  get baseStr(): number { return this.state.baseStr }
  get baseDex(): number { return this.state.baseDex }
  get baseInt(): number { return this.state.baseInt }

  get baseRam(): number { return this.state.baseRam }
  get baseDisk(): number { return this.state.baseDisk }

  get minimapRoomSize(): number { return this.state.minimapRoomSize }
  get minimapMargins(): number { return this.state.minimapMargins }

  get logSize(): number { return this.state.logSize }

  get serverLogSize(): number { return this.state.serverLogSize }
  get serverSpeed(): number { return this.state.serverSpeed }

  get operationBaseDelay(): number { return this.state.operationBaseDelay }

  get maxFileSize(): number { return this.state.maxFileSize }

  get dummyFileTypes() { return this.state.dummyFileTypes }

  get battleDice(): DieFaces { return this.state.battleDice }
  get npcBattleDice(): DieFaces { return this.state.npcBattleDice }

  get combatXP(): number { return this.state.combatXP }

  async reset() {}

  randomDie(faces: DieFaces, omit: string[] = []): IDie {
    let die = { faces, value: random(1, 6) } as IDie
    while (omit.includes(faces[die.value - 1].value)) {
      die = { faces, value: random(1, 6) }
    }
    return die
  }

  randomDice(count: number, faces: DieFaces, omit: string[] = [], sorted = true): IDie[] {
    const dice = new Array(count).fill(0).map(() => this.randomDie(faces, omit))
    return sorted
      ? dice.sort((a, b) => a.value < b.value ? -1 : 1)
      : dice
  }
}
