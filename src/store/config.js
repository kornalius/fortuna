import { reactive } from 'vue'

export default class Config {
  storeName = 'config'

  state = reactive({
    // World

    startDate: '2157-01-01',
    startTime: '18:00',
    tickTime: 15,
    tickInterval: 60 * 1000,
    startCityCode: 'TestCity',

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

    // battle dice faces
    battleDice: [
      { value: 'A', icon: 'jam:sword-f', color: '#888' }, // SWORD
      { value: 'D', icon: 'bxs:shield', color: '#6C852B' }, // SHIELD
      { value: 'H', icon: 'bxs:heart', color: '#A02A1A' }, // HEART
      { value: 'B', icon: 'fa-solid:bomb', color: '#222' }, // BOMB
      { value: 'X', icon: 'bi:lightning-fill', color: '#F19936' }, // SHIELD BUSTER
      { value: '_', icon: '' }, // BLANK
    ],

    // Npc battle dice
    npcBattleDice: [
      { value: 'A', icon: 'jam:sword-f', color: '#888' }, // SWORD
      { value: 'D', icon: 'bxs:shield', color: '#6C852B' }, // DEFEND
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
      { value: '_', icon: '' }, // BLANK
    ],
  })

  get startDate() { return this.state.startDate }
  get startTime() { return this.state.startTime }
  get tickTime() { return this.state.tickTime }
  get tickInterval() { return this.state.tickInterval }
  get startCityCode() { return this.state.startCityCode }

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

  async reset() {}
}
