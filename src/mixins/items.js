import { store } from '@/store'
import Item from '@/classes/items/item';

export default {
  state: {
  },

  get items() { return store.items.list.filter(i => i.location === this) },

  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    if (data instanceof Item) {
      store.items.update({ ...data, location: this })
      return data
    } else {
      const i = new Item(data)
      store.items.update(i)
      i.location = this
      return i
    }
  },
}
