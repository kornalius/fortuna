import { can, emit, log } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object searchable
 */

export default {
  state: {
    // is the object searchable
    searchable: true,
    // how many times the object has been searched
    searched: 0,
    actions: [
      item => (
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

  get isSearchable() { return this.state.searchable },
  set searchable(value) { this.state.searchable = value },

  get searched() { return this.state.searched },
  set searched(value) { this.state.searched = value },

  get wasSearched() { return this.searched > 0},

  get searchLabel() {
    return `Search ${this.requirementsLabelFor('search')}`
  },

  canSearch(showMessage) {
    return can(this, [
      {
        expr: () => !this.isSearchable,
        log: `${this.name} cannot be searched`,
      },
      {
        expr: () => this.searched > 0,
        log: `${this.name} has already been searched`,
      },
      {
        expr: () => store.player.isInCombat,
        log: `${this.name} can only be searched outside of combat`,
      },
      {
        expr: () => store.player.isInDialog,
        log: 'You cannot search this while in conversation',
      },
      {
        expr: () => this.isOpenable && this.isClosed,
        log: `${this.name} needs to be opened first before you can search it`,
      },
    ], showMessage, 'search')
  },

  async search() {
    if (!this.canSearch(true)) {
      return false
    }
    this.searched += 1
    log(`You search the ${this.name.toLowerCase()}`)
    await emit.call(this, 'onSearch')
    return true
  },

  async onSearch() {},
}
