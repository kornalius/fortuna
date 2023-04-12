/**
 * Makes an object searchable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameData } from './name'
import { IIcon, IIconData } from './icon'
import { IRequirements, IRequirementsData } from './requirements'
import { IOpenable, IOpenableData } from './openable'
import { IActions, IActionsData, IDropdownItem } from '@/mixins/actions'

export interface ISearchableData extends
  INameData,
  IIconData,
  IOpenableData,
  IRequirementsData,
  IActionsData
{
  // is the object searchable
  searchable?: boolean
  // how many times the object has been searched
  searched?: number
  onSearch?: () => Promise<void>
}

export interface ISearchable extends
  IName,
  IIcon,
  IOpenable,
  IRequirements,
  IActions
{
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
    searchable: true,
    searched: 0,
    actions: [
      (item: ISearchable): IDropdownItem | undefined => (
        item.isSearchable
          ? {
            label: item.searchLabel,
            key: 'search',
            icon: 'search',
            disabled: !item.canSearch(),
            click: () => item.search(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'search', int: 1 },
    ],
  } as ISearchableData,

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
        log: () => `${this.nameProper} cannot be searched`,
      },
      {
        expr: () => this.searched > 0,
        log: () => `${this.nameProper} has already been searched`,
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => `${this.nameProper} can only be searched outside of combat`,
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot search this while in conversation',
      },
      {
        expr: () => this.isOpenable && this.isClosed,
        log: () => `${this.nameProper} needs to be opened first before you can search it`,
      },
    ], showMessage, 'search')
  },

  async search(): Promise<boolean> {
    if (!this.canSearch(true)) {
      return false
    }
    this.searched += 1
    log(`You search the ${this.nameDisplay}`, LOG_WARN, this.icon)
    await emit(this, 'onSearch')
    return true
  },

  async onSearch(): Promise<void> {},
}
