/**
 * Add a name state to object
 */

import { State } from '@/entity'
import { can } from '@/utils'
import { Item } from '@/classes/items/item'
import { IName, INameSetupData } from '@/mixins/name'
import { IActions, IActionsSetupData, IDropdownItem } from '@/mixins/actions'

export interface ISelectableSetupData extends
  INameSetupData,
  IActionsSetupData
{
  // is the object selectable
  selectable?: boolean
}

export interface ISelectable extends
  IName,
  IActions
{
  state: State
  get isSelectable(): boolean
  set selectable(value: boolean)
  get isSelected(): boolean
  get selectLabel(): string
  canSelect(showMessage?: boolean): boolean
  select(): Promise<boolean>
  unselect(): Promise<boolean>
  toggleSelect(): Promise<boolean>
}

// @ts-ignore
export const Selectable: ISelectable = {
  state: {
    // is the object selectable
    selectable: true,
    actions: [
      (item: ISelectable): IDropdownItem | undefined => (
        item.isSelectable
          ? {
            label: item.selectLabel,
            key: 'select',
            icon: 'select',
            disabled: !item.canSelect(),
            click: item.toggleSelect,
          }
          : undefined
      ),
    ],
  } as ISelectableSetupData,

  get isSelectable(): boolean { return this.state.selectable && (this as unknown as Item).isInInventory },
  set selectable(value: boolean) { this.state.selectable = value },

  get isSelected(): boolean { return window.store.game.selectedItem === (this as unknown as Item) },

  get selectLabel(): string { return !this.isSelected ? 'Select' : 'Unselect' },

  canSelect(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isSelectable,
        log: () => `${this.nameProper} cannot be selected`
      },
    ], showMessage, 'select')

  },

  async select(): Promise<boolean> {
    if (this.canSelect(true)) {
      return false
    }
    window.store.game.selectedItem = (this as unknown as Item)
    return true
  },

  async unselect(): Promise<boolean> {
    window.store.game.selectedItem = null
    return true
  },

  async toggleSelect(): Promise<boolean> {
    return this.isSelected
      ? this.select()
      : this.unselect()
  },
}
