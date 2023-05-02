import { ClassDefinition, randomItems } from '@/generators'
import { Item } from '@/classes/items/item'
import { State } from '@/entity'
import { IItems, IItemsData } from '@/mixins/items'

export interface IRandomItemsData extends
  IItemsData
{
  // random items or definitions to generate as its content when mounted
  randomItems?: (ClassDefinition | Item)[]
}

export interface IRandomItems extends
  IItems
{
  state: State
  get randomItems():  (ClassDefinition | Item)[]
  mounted(): void
}

// @ts-ignore
export const RandomItems: IRandomItems = {
  state: {
    randomItems: [],
  } as IRandomItemsData,

  get randomItems():  (ClassDefinition | Item)[] { return this.state.randomItems },

  mounted(): void {
    if (this.randomItems.length > 0) {
      const items = this.randomItems
        .filter((i) => i instanceof Item)
      const defs = this.randomItems
        .filter((i) => !items.includes(i))
      this.addItem(randomItems(defs as ClassDefinition[]))
      this.addItem(items)
    }
  }
}
