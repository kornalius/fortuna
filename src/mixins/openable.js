import compact from 'lodash/compact'
import { can, emit, log, LOG_WARN } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object openable and/or closable
 */

export default {
  state: {
    // is the object openable
    openable: true,
    // does it have an open state icon?
    openIconSuffix: false,
    // is the object closable
    closeable: true,
    // is the object opened
    opened: false,
    actions: [
      item => (
        item.isOpenable
          ? {
            label: item.openLabel,
            key: item.openKey,
            icon: item.openIcon,
            disabled: item.openDisabled,
            click: item.openClick,
          }
          : undefined
      ),
    ],
  },

  get isOpenable() { return this.state.openable },
  set openable(value) { this.state.openable = value },

  get isOpened() { return this.state.opened },
  set opened(value) { this.state.opened = value },

  get isCloseable() { return this.state.closeable },
  set closeable(value) { this.state.closeable = value },

  get isClosed() { return !this.state.opened },

  get openIconSuffix() { return this.state.openIconSuffix },
  set openIconSuffix(value) { this.state.openIconSuffix = value },

  get iconSuffix() {
    if (!this.openIconSuffix) {
      return this.state.iconSuffix
    }
    return compact([this.state.iconSuffix, this.isOpened ? 'open' : 'close']).join('-')
  },

  get openLabel() {
    return !this.isOpened
      ? `Open ${this.requirementsLabelFor('open')}`
      : `Close ${this.requirementsLabelFor('close')}`
  },

  get openKey() {
    return this.isOpened ? 'close' : 'open'
  },

  get openIcon() {
    return this.isOpened ? 'close' : 'open'
  },

  get openDisabled() {
    return this.isOpened ? !this.canClose() : !this.canOpen()
  },

  get openClick() {
    if (this.isOpened) {
      return async () => this.close()
    }
    return async () => this.open()
  },

  canOpen(showMessage) {
    return can(this, [
      {
        expr: () => !this.isOpenable,
        log: () => `${this.name} cannot be opened`
      },
      {
        expr: () => this.isOpened,
        log: () => `${this.name} is already opened`
      },
      {
        expr: () => this.isLocked,
        log: () => `${this.name} is locked`
      },
      {
        expr: () => store.player.isInCombat,
        log: () => 'You cannot open this while in combat'
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot open this while in conversation'
      },
    ], showMessage, 'open')
  },

  async open() {
    if (!this.canOpen(true)) {
      return false
    }
    this.opened = true
    log(`You opened ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
    await emit.call(this, 'onOpen')
    return true
  },

  async onOpen() {},

  canClose(showMessage) {
    return can(this, [
      {
        expr: () => !this.isCloseable,
        log: () => `${this.name} cannot be closed`
      },
      {
        expr: () => this.isClosed,
        log: () => `${this.name} is already closed`
      },
      {
        expr:() =>  store.player.isInCombat,
        log: () => 'You cannot close this while in combat'
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot close this while in conversation'
      },
    ], showMessage, 'close')
  },

  async close() {
    if (!this.canClose(true)) {
      return false
    }
    this.opened = false
    log(`You closed ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
    await emit.call(this, 'onClose')
    return true
  },

  async onClose() {},
}
