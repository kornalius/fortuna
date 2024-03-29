import { reactive } from 'vue'
import random from 'lodash/random'

export default class Config {
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
    ],

    // Npc battle dice
    npcBattleDice: [
      { value: 'A', icon: 'sword' }, // SWORD
      { value: 'D', icon: 'shield' }, // DEFEND
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
    ],

    // Combat

    // number of XP per NPC level when winning a combat
    combatXP: 100,
  })

  get startDate() { return this.state.startDate }
  get startTime() { return this.state.startTime }
  get tickTime() { return this.state.tickTime }
  get tickInterval() { return this.state.tickInterval }
  get startCityCode() { return this.state.startCityCode }

  get travelTime() {
    if (localStorage.getItem('DEV_MODE') === 'true') {
      return 500
    }
    return this.state.travelTime
  }

  get baseHp() { return this.state.baseHp }
  get highestHp() { return this.state.highestHp }
  get highestLvl() { return this.state.highestLvl }

  get baseDice() { return this.state.baseDice }
  get baseRolls() { return this.state.baseRolls }
  get baseStr() { return this.state.baseStr }
  get baseDex() { return this.state.baseDex }
  get baseInt() { return this.state.baseInt }

  get baseRam() { return this.state.baseRam }
  get baseDisk() { return this.state.baseDisk }

  get minimapRoomSize() { return this.state.minimapRoomSize }
  get minimapMargins() { return this.state.minimapMargins }

  get logSize() { return this.state.logSize }

  get serverLogSize() { return this.state.serverLogSize }
  get serverSpeed() { return this.state.serverSpeed }

  get operationBaseDelay() { return this.state.operationBaseDelay }

  get maxFileSize() { return this.state.maxFileSize }

  get dummyFileTypes() { return this.state.dummyFileTypes }

  get battleDice() { return this.state.battleDice }
  get npcBattleDice() { return this.state.npcBattleDice }

  get combatXP() { return this.state.combatXP }

  async reset() {}

  randomDie(diceConfig, omit = []) {
    let die = { faces: diceConfig, value: random(1, 6) }
    while (omit.includes(diceConfig[die.value - 1].value)) {
      die = { faces: diceConfig, value: random(1, 6) }
    }
    return die
  }

  randomDice(count, diceConfig, omit = [], sorted = true) {
    const dice = new Array(count).fill(0).map(() => this.randomDie(diceConfig, omit))
    return sorted
      ? dice.sort((a, b) => a.value < b.value ? -1 : 1)
      : dice
  }
}
