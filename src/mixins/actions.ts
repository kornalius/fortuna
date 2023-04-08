/**
 * Add actions menus to objects
 */

import compact from 'lodash/compact'
import uniqBy from 'lodash/uniqBy'
import reverse from 'lodash/reverse'
import { State } from '@/entity'
import { AnyData } from '@/utils'

export interface IDropdownItem {
  key: string
  label: string
  icon: string
  disabled: boolean
  click: () => Promise<void>,
}

export type ActionItem = ((item: AnyData) => IDropdownItem) | IDropdownItem

export type ActionOrder = string

export type ActionOmit = string

export interface IActions {
  state: State
  get actions(): ActionItem[]
  get dropdownOptions(): IDropdownItem[]
  actionToObject(a?: ActionItem): IDropdownItem
  findAction(key: string): IDropdownItem | undefined
}

export const Actions: IActions = {
  state: {
    actions: [] as ActionItem[],
    actionsOrder: [] as ActionOrder[],
    omitActions: [] as ActionOmit[],
  } as State,

  get actions(): ActionItem[] { return this.state.actions },

  get dropdownOptions(): IDropdownItem[] {
    const options = compact(this.actions.map(a => this.actionToObject(a)))
      .filter(a => !this.state.omitActions.includes(a.key))
    const orderedOptions: IDropdownItem[] = []
    this.state.actionsOrder.forEach((key: string) => {
      const a = options.find(a => a.key === key)
      if (a) {
        orderedOptions.push(a)
      }
    })
    options.forEach(a => {
      if (!orderedOptions.includes(a)) {
        orderedOptions.push(a)
      }
    })
    // take the latest key added
    const uniques = uniqBy(reverse(orderedOptions), 'key')
    // reverse it back to original order
    return reverse(uniques)
  },

  actionToObject(a?: ActionItem): IDropdownItem {
    return (typeof a === 'function' ? a(this) : a) as IDropdownItem
  },

  findAction(key: string): IDropdownItem | undefined {
    return this.actionToObject(this.actions.find(a => this.actionToObject(a)?.key === key))
  },
}