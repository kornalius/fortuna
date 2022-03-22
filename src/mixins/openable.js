import { can, emit, log, LOG_WARN } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object openable and/or closable
 */

export default {
  state: {
    // is the object openable
    openable: true,
    // is the object closable
    closable: true,
    // is the object opened
    opened: false,
    actions: [
      item => (
        item.isOpenable && !item.isOpened
          ? {
            label: item.openLabel,
            key: 'toggleOpen',
            icon: item.isOpened ? 'door-close' : 'door-open',
            disabled: !item.canOpen(),
            click: async () => item.open(),
          }
          : undefined
      ),
    ],
  },

  get isOpenable() { return this.state.openable },
  set openable(value) { this.state.openable = value },

  get isOpened() { return this.state.opened },
  set opened(value) { this.state.opened = value },

  get isClosable() { return this.state.closeable },
  set closeable(value) { this.state.closeable = value },

  get isClosed() { return !this.state.opened },

  get openLabel() {
    return !this.isOpened
      ? `Open ${this.requirementsLabelFor('open')}`
      : `Close ${this.requirementsLabelFor('close')}`
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
        expr: !this.isClosable,
        log: () => `${this.name} cannot be closed`
      },
      {
        expr: this.isClosed,
        log: () => `${this.name} is already closed`
      },
      {
        expr: store.player.isInCombat,
        log: () => 'You cannot close this while in combat'
      },
      {
        expr: store.player.isInDialog,
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
