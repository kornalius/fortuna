import { reactive } from 'vue'

export default class Config {
  storeName = 'config'

  state = reactive({
    baseHp: 10,
    highestHp: 100,
    highestLvl: 50,
    minimapRoomSize: 32,
    minimapMargins: 8,
    logSize: 100,
  })

  get baseHp() { return this.state.baseHp }
  get highestHp() { return this.state.highestHp }

  get highestLvl() { return this.state.highestLvl }

  get minimapRoomSize() { return this.state.minimapRoomSize }
  get minimapMargins() { return this.state.minimapMargins }

  get logSize() { return this.state.logSize }
}
