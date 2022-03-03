import { store } from '@/store'
import Entity from '@/entity'
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
    if (typeof id === 'string') {
      return !!this.get(id)
    }
    return this.items.includes(id)
  },

  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    if (data instanceof Entity) {
      data.location = this
      data.hovered = false
      store.items.update(data)
      return data
    } else {
      const i = new Item(data)
      i.location = this
      i.hovered = false
      store.items.update(i)
      return i
    }
  },
}
