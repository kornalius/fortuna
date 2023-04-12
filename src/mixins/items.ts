import { Entity, State } from '@/entity'
import { IItemData, Item } from '@/classes/items/item'
import { ILocation, ILocationData } from './location'
import { IQty, IQtyData } from './qty'
import { AnyData } from '@/utils'

export interface IItemsData extends
  ILocationData,
  IQtyData
{}

/**
 * List items owned or at location
 */
export interface IItems extends
  ILocation,
  IQty
{
  state: State
  get items(): Item[]
  get(id?: string): Item | undefined
  has(id: string | AnyData): boolean
  addItem(data: (Item | IItemData)[] | Item | IItemData): Item[] | Item
}

// @ts-ignore
export const Items: IItems = {
  state: {},

  /**
   * Return items in this location
   *
   * @returns {Entity[]}
   */
  get items(): Item[] { return window.store.items.list.filter(i => i.location === this) },

  /**
   * Get item from inventory
   *
   * @param id
   */
  get(id?: string): Item | undefined { return this.items.find(i => i.id === id) },

  /**
   * Does the player carry this item
   *
   * @param id
   */
  has(id: string | any): boolean {
    if (typeof id === 'string') {
      return !!this.get(id)
    }
    return this.items.includes(id)
  },

  /**
   * Add item to the location
   *
   */
  addItem(data: (Item | IItemData)[] | Item | IItemData): Item[] | Item {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d) as Item)
    }

    // when stackable, only increase qty of inventory item that match the stackableCode
    if (this.location?.isPlayer && data.stackableCode) {
      const i = this.items.find(i => i.code === data.stackableCode)
      if (i) {
        i.qty += (data?.qty || 0)
        if (data instanceof Item) {
          data.remove()
        }
      }
      return data as Item
    }

    if (data instanceof Item) {
      data.location = this
      data.hovered = false
      window.store.items.update(data)
      return data
    } else {
      const i = new Item(data)
      i.location = this
      i.hovered = false
      window.store.items.update(i)
      return i
    }
  },
}
