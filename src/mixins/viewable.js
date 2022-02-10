import isEmpty from 'lodash/isEmpty'
import { checkSoftware, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    viewed: false,
    content: null,
    type: 'txt',
    actions: [
      item => (
        item.canView()
          ? {
            label: 'View',
            key: 'view',
            icon: 'healthicons:magnifying-glass',
            disabled: false,
            click: async () => item.view(),
          }
          : undefined
      ),
    ],
  },

  get isViewable() { return !isEmpty(this.state.content) },

  get type() { return this.state.type },
  set type(value) { this.state.type = value },

  get content() { return this.state.content },
  set content(value) { this.state.content = value },

  get isTextFile() { return this.type === 'txt' },
  get isImageFile() { return this.type === 'img' },

  get isViewed() { return this.state.viewed },
  set viewed(value) { this.state.viewed = value },

  canView(showMessage) {
    if (!this.isViewable) {
      if (showMessage) {
        log(`${this.name} is not viewable`)
      }
      return false
    }
    if (store.player.installedViewer?.viewerType !== this.type) {
      if (showMessage) {
        log(`You need a ${this.type} viewer to view the content of ${this.name}`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedViewer,  showMessage && 'viewer')
  },

  async view() {
    if (!this.canView(true)) {
      return false
    }
    this.viewed = true
    log(`File: ${this.name}`, 1)
    log('---------------------------------')
    log(this.content)
    return true
  }
}
