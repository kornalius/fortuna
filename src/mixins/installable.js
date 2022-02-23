import { log, emit } from '@/utils'
import { store } from '@/store';

export default {
  state: {
    installable: false,
    installed: false,
    installType: null,
    actions: [
      item => (
        item.isInstallable
          ? {
            label: item.installLabel,
            key: 'install',
            icon: 'whh:savetodrive',
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
            icon: 'entypo:uninstall',
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
    if (!this.isInstallable) {
      if (showMessage) {
        log(`${this.name} cannot be installed`)
      }
      return false
    }
    if (this.isInstalled) {
      if (showMessage) {
        log(`${this.name} is already installed`)
      }
      return false
    }
    if (!store.player.has(this)) {
      if (showMessage) {
        log(`${this.name} needs to be in your inventory first`)
      }
      return false
    }
    if (store.player.hasInstalledSoftwareOfType(this.installType)) {
      if (showMessage) {
        log(`You have already have a ${this.installType} installed`)
      }
      return false
    }
    // for files and softwares
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is locked while an operation is running on it`)
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('install', showMessage));
  },

  async install() {
    if (!this.canInstall(true)) {
      return false
    }
    store.game.playSound('hd2')
    log(`Installing ${this.name.toLowerCase()}...`)
    return this.operate('install', async () => {
      store.game.stopSound('hd2')
      this.installed = true
      log(`You have successfully installed ${this.name.toLowerCase()}`)
      await emit.call(this, 'onInstall')
    },this.weight)
  },

  async onInstall() {},

  canUninstall(showMessage) {
    if (!this.isInstallable) {
      if (showMessage) {
        log(`${this.name} cannot be uninstalled`)
      }
      return false
    }
    if (!this.isInstalled) {
      if (showMessage) {
        log(`${this.name} is not installed`)
      }
      return false
    }
    // for files and softwares
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is locked while an operation is running on it`)
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('uninstall', showMessage));
  },

  async uninstall() {
    if (!this.canUninstall(true)) {
      return false
    }
    store.game.playSound('hd2')
    log(`Uninstalling ${this.name.toLowerCase()}...`)
    return this.operate('uninstall', async () => {
      store.game.stopSound('hd2')
      this.installed = false
      log(`You have successfully uninstalled ${this.name.toLowerCase()}`)
      await emit.call(this, 'onUninstall')
    }, this.weight)
  },

  async onUninstall() {},
}
