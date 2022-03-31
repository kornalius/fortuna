import { log, emit, can, LOG_WARN } from '@/utils'
import { store } from '@/store'

/**
 * Make the object installable (used for Software)
 */

export default {
  state: {
    // is the object installable
    installable: false,
    // has the object been installed
    installed: false,
    // type name of install (can only install one per type)
    installType: null,
    actions: [
      item => (
        item.isInstallable
          ? {
            label: item.installLabel,
            key: 'install',
            icon: 'install',
            disabled: !item.canInstall(),
            click: async () => item.install(),
          }
        : undefined
      ),
      item => (
        item.isInstallable
          ? {
            label: item.uninstallLabel,
            key: 'uninstall',
            icon: 'uninstall',
            disabled: !item.canUninstall(),
            click: async () => item.uninstall(),
          }
          : undefined
      ),
    ],
  },

  get isInstallable() { return this.state.installable },
  set installable(value) { this.state.installable = value },

  get isInstalled() { return this.state.installed },
  set installed(value) { this.state.installed = value },

  get installType() { return this.state.installType },
  set installType(value) { this.state.installType = value },

  get installLabel() {
    return `Install ${this.requirementsLabelFor('install')}`
  },

  get uninstallLabel() {
    return `Uninstall ${this.requirementsLabelFor('uninstall')}`
  },

  canInstall(showMessage) {
    return can(this, [
      {
        expr: () => !this.isInstallable,
        log: () => `${this.name} cannot be installed`
      },
      {
        expr: () => this.isInstalled,
        log: () => `${this.name} is already installed`
      },
      {
        expr: () => !store.player.has(this),
        log: () => `${this.name} needs to be in your inventory first`
      },
      {
        expr: () => store.player.hasInstalledSoftwareOfType(this.installType),
        log: () => `You have already have a ${this.installType} installed`
      },
      // for files and softwares
      {
        expr: () => this.isBusy,
        log: () => `${this.name} is locked while an operation is running on it`
      },
    ], showMessage, 'install')
  },

  async install() {
    if (!this.canInstall(true)) {
      return false
    }
    store.game.playSound('hd2')
    log(`Installing ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('install', async () => {
      store.game.stopSound('hd2')
      this.installed = true
      log(`You have successfully installed ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit.call(this, 'onInstall')
    },this.weight)
  },

  async onInstall() {},

  canUninstall(showMessage) {
    return can(this, [
      {
        expr: () => !this.isInstallable,
        log: () => `${this.name} cannot be uninstalled`
      },
      {
        expr: () => !this.isInstalled,
        log: () => `${this.name} is not installed`
      },
      // for files and softwares
      {
        expr: () => this.isBusy,
        log: () => `${this.name} is locked while an operation is running on it`
      },
    ], showMessage, 'uninstall')
  },

  async uninstall() {
    if (!this.canUninstall(true)) {
      return false
    }
    store.game.playSound('hd2')
    log(`Uninstalling ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('uninstall', async () => {
      store.game.stopSound('hd2')
      this.installed = false
      log(`You have successfully uninstalled ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit.call(this, 'onUninstall')
    }, this.weight)
  },

  async onUninstall() {},
}
