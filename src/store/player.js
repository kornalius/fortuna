import { reactive } from 'vue'
import { store } from './index'
import { mixin } from '@/utils'
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Xp from '@/mixins/xp'
import Item from '@/classes/items/item';

export default class Player {
  storeName = 'player'

  constructor() {
    this.state = reactive({
      ...this.state,
      name: '',
      hp: this.maxHp,
      xp: 0,
    })
  }

  get name() { return this.state.name }
  set name(value) { this.state.name = value }

  get items() { return store.items.list.filter(i => i.locationStore === 'player') }

  get maxWeight() { return 10 * Math.pow(this.lvl, 2)  }
  get carryWeight() { return this.items.reduce((acc, item) => acc + item.weight, 0) }

  get canMove() { return this.carryWeight <= this.maxWeight }

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

  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    if (data instanceof Item) {
      store.items.update({ ...data, locationStore: 'player' })
      return data
    } else {
      const i = new Item(data)
      store.items.update(i)
      i.locationStore = 'player'
      return i
    }
  }
}

mixin(Player, [Level, Buffable, Hp, Xp])
