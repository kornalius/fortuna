import isEmpty from 'lodash/isEmpty'
import { can, checkSoftware, emit, logs } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object viewable (for Files)
 */

export default {
  state: {
    // is the object viewable
    viewed: false,
    // content of the object
    content: null,
    // type of the object (filetype)
    type: 'txt',
    actions: [
      item => (
        item.isViewable
          ? {
            label: item.viewLabel,
            key: 'view',
            icon: 'view',
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
  get isKeyFile() { return this.type === 'key' },
  get isCodeFile() { return this.type === 'cod' },
  get isCommandFile() { return this.type === 'cmd' },
  get isListFile() { return this.type === 'lst' },
  get isDataFile() { return this.type === 'dat' },
  get isAudioFile() { return this.type === 'aud' },

  get icon() {
    if (this.isTextFile) {
      return 'fileText'
    }
    if (this.isImageFile) {
      return 'fileImage'
    }
    if (this.isKeyFile) {
      return 'fileKey'
    }
    if (this.isCodeFile) {
      return 'fileCode'
    }
    if (this.isCommandFile) {
      return 'fileCommand'
    }
    if (this.isListFile) {
      return 'fileList'
    }
    if (this.isDataFile) {
      return 'fileJson'
    }
    if (this.isAudioFile) {
      return 'fileAudio'
    }
    if (this.isViewable) {
      return 'fileSearch'
    }
    return this.state.icon || 'file'
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
