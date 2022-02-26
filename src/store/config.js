import { reactive } from 'vue'

export default class Config {
  storeName = 'config'

  state = reactive({
    // World

    startCityName: 'Introduction City',

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
      { value: 'A', icon: 'jam:sword-f', color: '#888' },
      { value: 'D', icon: 'bxs:shield', color: '#6C852B' },
      { value: 'H', icon: 'bxs:heart', color: '#A02A1A' },
      { value: 'B', icon: 'fa-solid:bomb', color: '#222' },
      { value: 'X', icon: 'bi:lightning-fill', color: '#F19936' },
      { value: '_', icon: '' },
    ],

    // Npc battle dice
    npcBattleDice: [
      { value: 'A', icon: 'jam:sword-f', color: '#888' },
      { value: 'D', icon: 'bxs:shield', color: '#6C852B' },
      { value: '_', icon: '' },
      { value: '_', icon: '' },
      { value: '_', icon: '' },
      { value: '_', icon: '' },
    ],
  })

  get startCityName() { return this.state.startCityName }

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
