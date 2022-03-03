import { emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    searchable: false,
    searched: 0,
    actions: [
      item => (
        item.isSearchable
          ? {
            label: item.searchLabel,
            key: 'search',
            icon: 'fluent:box-search-24-filled',
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

  get searchLabel() {
    return `Search ${this.requirementsLabelFor('search')}`
  },

  canSearch(showMessage) {
    if (!this.isSearchable) {
      if (showMessage) {
        log(`${this.name} cannot be searched`)
      }
      return false
    }
    if (store.player.isInCombat) {
      if (showMessage) {
        log(`${this.name} can only be searched outside of combat`)
      }
      return false
    }
    if (store.player.isInDialog) {
      if (showMessage) {
        log('You cannot search this while in conversation')
      }
      return false
    }
    if (this.isOpenable && this.isClosed) {
      if (showMessage) {
        log(`${this.name} needs to be opened first before you can search it`)
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('search', showMessage));
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
