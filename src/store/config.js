import { reactive } from 'vue'

export default class Config {
  storeName = 'config'

  state = reactive({
    // Player

    baseHp: 10,
    baseStr: 1,
    baseDex: 1,
    baseInt: 1,
    baseAp: 4,
    highestHp: 100,
    highestLvl: 50,
    baseRam: 100,
    baseDisk: 1000,
    maxHand: 4,

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

    // new card delay
    newCardDelay: 500,
    // timeout for the kill card animation
    killCardDelay: 1000,
  })

  get baseHp() { return this.state.baseHp }
  get highestHp() { return this.state.highestHp }
  get highestLvl() { return this.state.highestLvl }

  get baseAp() { return this.state.baseAp }
  get baseStr() { return this.state.baseStr }
  get baseDex() { return this.state.baseDex }
  get baseInt() { return this.state.baseInt }

  get maxHand() { return this.state.maxHand }

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

  get newCardDelay() { return this.state.newCardDelay }
  get killCardDelay() { return this.state.killCardDelay }
}
