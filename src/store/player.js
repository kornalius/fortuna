import { reactive } from 'vue'
import { store } from './index'
import { mixin } from '@/utils'
import Item from '@/classes/items/item';
import Name from '@/mixins/name'
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

  get items() { return store.items.list.filter(i => i.locationStore === this.storeName) }

  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    if (data instanceof Item) {
      data.locationId = undefined
      data.locationStore = this.storeName
      store.items.update(data)
      return data
    } else {
      const i = new Item(data)
      i.locationStore = this.storeName
      store.items.update(i)
      return i
    }
  }
}

mixin(Player, [Name, Level, Buffable, Items, Hp, Xp, Carry])
