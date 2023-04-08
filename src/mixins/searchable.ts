/**
 * Makes an object searchable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from './name'
import { IIcon } from './icon'
import { IRequirements } from './requirements'
import { IOpenable } from './openable'

export interface ISearchable extends IName, IIcon, IOpenable, IRequirements {
  state: State
  get isSearchable(): boolean
  set searchable(value: boolean)
  get searched(): number
  set searched(value)
  get wasSearched(): boolean
  get searchLabel(): string
  canSearch(showMessage?: boolean): boolean
  search(): Promise<boolean>
  onSearch(): Promise<void>
}

// @ts-ignore
export const Searchable: ISearchable = {
  state: {
    // is the object searchable
    searchable: true,
    // how many times the object has been searched
    searched: 0,
    actions: [
      (item: ISearchable) => (
        item.isSearchable
          ? {
            label: item.searchLabel,
            key: 'search',
            icon: 'search',
            disabled: !item.canSearch(),
            click: async () => item.search(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'search', int: 1 },
    ],
  },

  get isSearchable(): boolean { return this.state.searchable },
  set searchable(value: boolean) { this.state.searchable = value },

  get searched(): number { return this.state.searched },
  set searched(value) { this.state.searched = value },

  get wasSearched(): boolean { return this.searched > 0},

  get searchLabel(): string { return `Search ${this.requirementsLabelFor('search')}` },

  canSearch(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isSearchable,
        log: () => `${this.name} cannot be searched`,
      },
      {
        expr: () => this.searched > 0,
        log: () => `${this.name} has already been searched`,
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => `${this.name} can only be searched outside of combat`,
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot search this while in conversation',
      },
      {
        expr: () => this.isOpenable && this.isClosed,
        log: () => `${this.name} needs to be opened first before you can search it`,
      },
    ], showMessage, 'search')
  },

  async search(): Promise<boolean> {
    if (!this.canSearch(true)) {
      return false
    }
    this.searched += 1
    log(`You search the ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
    await emit(this, 'onSearch')
    return true
  },

  async onSearch(): Promise<void> {},
}
