import isEmpty from 'lodash/isEmpty'
import { can, checkSoftware, emit, logs } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    viewed: false,
    content: null,
    type: 'txt',
    actions: [
      item => (
        item.isViewable
          ? {
            label: item.viewLabel,
            key: 'view',
            icon: 'healthicons:magnifying-glass',
            disabled: !item.canView(),
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

  get icon() {
    if (this.isViewable) {
      if (this.isTextFile) {
        return 'mdi:file-document'
      }
      if (this.isImageFile) {
        return 'mdi:file-image'
      }
      return 'mdi:file-eye'
    }
    return 'mdi:file-question'
  },

  get isViewed() { return this.state.viewed },
  set viewed(value) { this.state.viewed = value },

  get viewLabel() {
    return `View ${this.requirementsLabelFor('view')}`
  },

  canView(showMessage) {
    return can(this, [
      {
        expr: () => !this.isViewable,
        log: () => `${this.name} is not viewable`
      },
      {
        expr: () => store.player.installedViewer?.viewerType !== this.type,
        log: () => `You need a ${this.type} viewer to view the content of ${this.name.toLowerCase()}`
      },
      {
        expr: () => !checkSoftware.call(this, store.player.installedViewer,  showMessage),
      }
    ], showMessage, 'view')
  },

  async view() {
    if (!this.canView(true)) {
      return false
    }
    this.viewed = true
    const toPrint = [
      '',
      `File: ${this.name}`,
      '---------------------------------',
      ...this.content.split('\n'),
    ]
    if (this.isOnServer) {
      if (this.isOnServer) {
        store.game.playSound('hd')
      }
      return this.operate('view', async () => {
        store.game.stopSound('hd')
        this.location.println(...toPrint)
        await emit.call(this, 'onView')
      }, this.weight)
    } else {
      logs(...toPrint)
    }
    await emit.call(this, 'onView')
    return true
  },

  async onView() {},
}
