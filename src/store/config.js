import { reactive } from 'vue'

export default class Config {
  storeName = 'config'

  state = reactive({
    baseHp: 10,
    highestHp: 100,
    highestLvl: 50,
  })

  get baseHp() { return this.state.baseHp }
  get highestHp() { return this.state.highestHp }

  get highestLvl() { return this.state.highestLvl }
}
