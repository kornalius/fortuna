import { store } from '@/store'
import Entity from '@/entity'
import Item from '@/classes/items/item'

export default {
  state: {},

  /**
   * Return items in this location
   *
   * @returns {Entity[]}
   */
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

  /**
   * Add item to the location
   *
   */
  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    // when stackable, only increase qty of inventory item that match the stackableCode
    if (this.location?.isPlayer && data.stackableCode) {
      const i = this.items.find(i => i.code === data.stackableCode)
      if (i) {
        i.qty += data.qty
        if (data instanceof Entity) {
          data.remove()
        }
      }
      return data
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
