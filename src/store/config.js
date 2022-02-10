import { reactive } from 'vue'

export default class Config {
  storeName = 'config'

  state = reactive({
    baseHp: 10,
    highestHp: 100,
    highestLvl: 50,
    baseRam: 100,
    baseDisk: 1000,
    // minimap room size in pixels
    minimapRoomSize: 32,
    // minimap margins
    minimapMargins: 8,
    // number of buffered lines in the log
    logSize: 100,
    // number of buffered lines in server log
    serverLogSize: 50,
    // speed at which the server log characters are process in buffers
    serverSpeed: 50,
    // file, software and server operation base delay time
    operationBaseDelay: 1500,
  })

  get baseHp() { return this.state.baseHp }
  get highestHp() { return this.state.highestHp }

  get baseRam() { return this.state.baseRam }
  get baseDisk() { return this.state.baseDisk }

  get highestLvl() { return this.state.highestLvl }

  get minimapRoomSize() { return this.state.minimapRoomSize }
  get minimapMargins() { return this.state.minimapMargins }

  get logSize() { return this.state.logSize }

  get serverLogSize() { return this.state.serverLogSize }
  get serverSpeed() { return this.state.serverSpeed }

  get operationBaseDelay() { return this.state.operationBaseDelay }

}
