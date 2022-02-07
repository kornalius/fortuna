import { store } from '@/store'
import Item from '@/classes/items/item'

export default {
  state: {
  },

  get items() { return store.items.list.filter(i => i.location === this) },

  /**
   * Get item from inventory
   *
   * @param id
   */
  get(id) {
    return this.items.find(i => i.id === id)
  },

  /**
   * Does the player carry this item
   *
   * @param id
   */
  has(id) {
    return !!this.get(id)
  },

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