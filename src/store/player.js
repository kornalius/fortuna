import { reactive } from 'vue'
import { store } from './index'
import { mixin } from '@/utils'
import Item from '@/classes/items/item';
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Xp from '@/mixins/xp'
import Items from '@/mixins/items'
import Carry from '@/mixins/carry'

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

  get items() { return store.items.list.filter(i => i.locationStore === this.storeName) }

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

mixin(Player, [Level, Buffable, Items, Hp, Xp, Carry])
