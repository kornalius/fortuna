/**
 * Makes an object viewable (for Files)
 */

import isEmpty from 'lodash/isEmpty'
import { can, checkSoftware, emit, logs } from '@/utils'
import { State } from '@/entity'
import { IName } from '@/mixins/name'
import { IRequirements } from '@/mixins/requirements'
import { IOperation } from '@/mixins/operation'
import { IWeight } from '@/mixins/weight'
import { ILocation } from '@/mixins/location'

export interface IViewable extends IName, IRequirements, IOperation, ILocation, IWeight {
  state: State
  get isViewable(): boolean
  get type(): string
  set type(value)
  get content(): string | null
  set content(value)
  get isTextFile(): boolean
  get isImageFile(): boolean
  get isKeyFile(): boolean
  get isCodeFile(): boolean
  get isCommandFile(): boolean
  get isListFile(): boolean
  get isDataFile(): boolean
  get isAudioFile(): boolean
  get icon(): string | null
  set icon(value)
  get isViewed(): boolean
  set viewed(value: boolean)
  get viewLabel(): string
  canView(showMessage?: boolean): boolean
  view(): Promise<boolean>
  onView(): Promise<void>
}

// @ts-ignore
export const Viewable: IViewable = {
  state: {
    // is the object viewable
    viewed: false,
    // content of the object
    content: null,
    // type of the object (filetype)
    type: 'txt',
    actions: [
      (item: IViewable) => (
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

  get isViewable(): boolean { return !isEmpty(this.state.content) },

  get type(): string { return this.state.type },
  set type(value) { this.state.type = value },

  get content(): string | null { return this.state.content },
  set content(value) { this.state.content = value },

  get isTextFile(): boolean { return this.type === 'txt' },
  get isImageFile(): boolean { return this.type === 'img' },
  get isKeyFile(): boolean { return this.type === 'key' },
  get isCodeFile(): boolean { return this.type === 'cod' },
  get isCommandFile(): boolean { return this.type === 'cmd' },
  get isListFile(): boolean { return this.type === 'lst' },
  get isDataFile(): boolean { return this.type === 'dat' },
  get isAudioFile(): boolean { return this.type === 'aud' },

  get icon(): string | null {
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
  set icon(value) {},

  get isViewed(): boolean { return this.state.viewed },
  set viewed(value: boolean) { this.state.viewed = value },

  get viewLabel(): string { return `View ${this.requirementsLabelFor('view')}` },

  canView(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isViewable,
        log: () => `${this.nameProper} is not viewable`
      },
      {
        expr: () => window.store.player.installedViewer?.viewerType !== this.type,
        log: () => `You need a ${this.type} viewer to view the content of ${this.nameDisplay}`
      },
      {
        expr: () => !checkSoftware(this, window.store.player.installedViewer, showMessage),
      }
    ], showMessage, 'view')
  },

  async view(): Promise<boolean> {
    if (!this.canView(true)) {
      return false
    }
    this.viewed = true
    const toPrint = [
      '',
      `File: ${this.name}`,
      '---------------------------------',
      ...(this.content || '').split('\n'),
    ]
    if ((this as any).isOnServer) {
      window.store.game.playSound('hd')
      return this.operate('view', async () => {
        window.store.game.stopSound('hd')
        this.location?.println(...toPrint)
        await emit(this, 'onView')
        return true
      }, this.weight)
    } else {
      logs(...toPrint)
    }
    await emit(this, 'onView')
    return true
  },

  async onView(): Promise<void> {},
}
