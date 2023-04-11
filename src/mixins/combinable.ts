/**
 * Make items combinable between them
 */

import { pluralize } from '@capaj/pluralize'
import { State } from '@/entity'
import { AnyData, can, emit, log, LOG_WARN, registeredClasses } from '@/utils'
import { Item } from '@/classes/items/item'
import { IName } from '@/mixins/name'
import { IIcon } from '@/mixins/icon'
import { IOperation } from '@/mixins/operation'

export interface ICombinableRecipe {
  // target item constructor name
  target: string
  // minimum qty needed
  qty?: number
  // result item constructor name
  result: string
  // optional data to pass to the new result item on creation
  result_data?: AnyData
}

export interface ICombinable extends IName, IIcon, IOperation {
  state: State
  get isCombinable(): boolean
  set combinable(value: boolean)
  get recipes(): ICombinableRecipe[]
  set recipes(value)
  get combineDelay(): number
  set combineDelay(value)
  get combineLabel(): string
  canCombineWith(target_id?: string, target_qty?: number, showMessage?: boolean): boolean
  combineWith(target_id?: string, target_qty?: number): Promise<boolean>
  onCombine(target: Item, target_qty: number): Promise<void>
}

// @ts-ignore
export const Combinable: ICombinable = {
  state: {
    // is the item combinable
    combinable: false,
    // list of recipes
    recipes: [] as ICombinableRecipe[],
    // time is takes to combine an item
    combineDelay: 1,
    actions: [
      (item: ICombinable) => (
        item.isCombinable
          ? {
            label: item.combineLabel,
            key: 'combine',
            icon: 'combine',
            disabled: !item.canCombineWith(window.store.game.selectedItem?.id),
            click: async () => item.combineWith(window.store.game.selectedItem?.id),
          }
          : undefined
      ),
    ],
  },

  get isCombinable(): boolean { return this.state.combinable && (this as unknown as Item).isInInventory },
  set combinable(value: boolean) { this.state.combinable = value },

  get recipes(): ICombinableRecipe[] { return this.state.recipes },
  set recipes(value) { this.state.recipes = value },

  get combineDelay(): number { return this.state.combineDelay },
  set combineDelay(value) { this.state.combineDelay = value },

  get combineLabel(): string {
    const s = window.store.game.selectedItem
    return s
      ? `Combine ${this.nameDisplay} with ${s?.nameDisplay}...`
      : 'Combine...'
  },

  canCombineWith(target_id?: string, target_qty: number = 1, showMessage?: boolean): boolean {
    const target = window.store.items.get(target_id) as Item | undefined
    const t_qty = target?.qty || 0
    const recipe = this.recipes
      .find((r) => r.target === target?.constructor.name)
    const r_qty = recipe?.qty || 0

    return can(this, [
      {
        expr: () => !this.isCombinable || this.recipes.length === 0,
        log: () => `${this.nameProper} is not a combinable item`
      },
      {
        expr: () => !recipe,
        log: () => `Cannot find a find a suitable recipe to combine these items together`
      },
      {
        expr: () => !target,
        log: () => `Cannot find the target id with id '${target_id}'`
      },
      {
        expr: () => t_qty < target_qty,
        log: () => `There is not enough ${pluralize(target?.nameDisplay)}. You need ${target_qty - t_qty} more.`
      },
      {
        expr: () => r_qty > target_qty,
        log: () => `You need at least ${r_qty} ${pluralize(target?.nameDisplay, r_qty)}`
      },
    ], showMessage, 'combine')
  },

  async combineWith(target_id?: string, target_qty: number = 1): Promise<boolean> {
    if (!this.canCombineWith(target_id, target_qty, true)) {
      return false
    }

    const target = window.store.items.get(target_id) as Item
    const recipe = this.recipes
      .find((r) => r.target === target?.constructor.name) as ICombinableRecipe

    log(`Combining ${this.nameDisplay} with ${target.nameDisplay}...`, LOG_WARN, this.icon)
    await this.operate('combine', async () => {
      setTimeout(async () => {
        log(`You have combined ${this.nameDisplay} with ${target.nameDisplay}`, LOG_WARN, this.icon)

        await emit(this, 'onCombine', target, target_qty)

        // reduce qty used from the target first
        target.qty = target.qty - target_qty

        // if none left, remove it
        if (target.qty <= 0) {
          target.remove()
        }

        // get the original source item 'this' position in the store
        const idx = window.store.items.list.indexOf(this as unknown as Item)

        // create the new item that is going to replace 'this'
        const Klass = registeredClasses[recipe.result]
        const c = new Klass(recipe.result_data) as Item

        // remove 'this' source item
        (this as unknown as Item).remove()

        // insert the new resulting item at the same position as the original source item
        window.store.items.list.splice(idx, 0, c)
      }, 1)
      return true
    }, this.combineDelay)
    return true
  },

  async onCombine(target: Item, target_qty: number): Promise<void> {},
}
