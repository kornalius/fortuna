import { reactive } from 'vue'
import { store } from './index';
import clamp from 'lodash/clamp'

export default class Player {
  storeName = 'player'

  state = reactive({
    name: '',
    hp: this.baseHp,
    xp: 0,
    lvl: 1,
  })

  get name() { return this.state.name }

  get hp() { return this.state.hp }
  set hp(value) { this.state.hp = clamp(value, 0, this.maxHp) }
  get baseHp() { return store.config.baseHp }
  get highestHp() { return store.config.highestHp }
  get maxHp() {
    return Math.floor(this.baseHp + (this.highestHp - this.baseHp) * this.lvl / this.highestLvl)
  }

  get lvl() { return this.state.lvl }
  set lvl(value) { this.state.lvl = clamp(value, 1, this.highestLvl) }
  get highestLvl() { return store.config.highestLvl }

  get xp() { return this.state.xp }
  set xp(value) { this.state.xp = Math.max(0, value) }
  get nextXp() { return 100 * Math.pow(this.lvl, 2) }
  get canLevelUp() { return this.xp > this.nextXp }

  get items() { return store.items.list.filter(i => i.locationStore === 'player') }

  get maxWeight() { return 10 * Math.pow(this.lvl, 2)  }
  get carryWeight() { return this.items.reduce((acc, item) => acc + item.weight, 0) }

  get canMove() { return this.carryWeight <= this.maxWeight }

  rename(name) {
    this.state.name = name
  }
}
