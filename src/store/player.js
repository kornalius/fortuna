import { reactive } from 'vue'
import { store } from './index'
import { mixin } from '@/utils'
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Xp from '@/mixins/xp'

export default class Player {
  storeName = 'player'

  constructor() {
    this.state = reactive({
      ...this.state,
      name: '',
      hp: this.maxHp,
      xp: 0,
      roomId: undefined,
    })
  }

  get name() { return this.state.name }
  set name(value) { this.state.name = value }

  get items() { return store.items.list.filter(i => i.locationStore === 'player') }

  get maxWeight() { return 10 * Math.pow(this.lvl, 2)  }
  get carryWeight() { return this.items.reduce((acc, item) => acc + item.weight, 0) }

  get canMove() { return this.carryWeight <= this.maxWeight }

  get room() {
    return this.state.roomId
      ? store.rooms.get(this.state.roomId)
      : undefined
  }
  set room(value) {
    if (value) {
      this.state.roomId = value.id
    } else {
      this.state.roomId = undefined
    }
  }

  /**
   * Get item from inventory
   *
   * @param id
   */
  get(id) {
    return this.items.find(i => i.id === id)
  }

  /**
   * Does the player carry this item
   *
   * @param id
   */
  has(id) {
    return !!this.get(id)
  }

  rename(name) {
    this.name = name
  }
}

mixin(Player, [Level, Buffable, Hp, Xp])
