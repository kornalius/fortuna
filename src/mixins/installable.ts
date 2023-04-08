/**
 * Make the object installable (used for Software)
 */

import { log, emit, can, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from './name'
import { IIcon } from './icon'
import { IRequirements } from './requirements'
import { IWeight } from './weight'
import { IOperation } from './operation'

export interface IInstallable extends IName, IIcon, IRequirements, IWeight, IOperation {
  state: State
  get isInstallable(): boolean
  set installable(value: boolean)
  get isInstalled(): boolean
  set installed(value: boolean)
  get installType(): string | null
  set installType(value)
  get installLabel(): string
  get uninstallLabel(): string
  canInstall(showMessage?: boolean): boolean
  install(): Promise<boolean>
  onInstall(): Promise<void>
  canUninstall(showMessage?: boolean): boolean
  uninstall(): Promise<boolean>
  onUninstall(): Promise<void>
}

// @ts-ignore
export const Installable: IInstallable = {
  state: {
    // is the object installable
    installable: false,
    // has the object been installed
    installed: false,
    // type name of install (can only install one per type)
    installType: null,
    actions: [
      (item: IInstallable) => (
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
      (item: IInstallable) => (
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

  get isInstallable(): boolean { return this.state.installable },
  set installable(value: boolean) { this.state.installable = value },

  get isInstalled(): boolean { return this.state.installed },
  set installed(value: boolean) { this.state.installed = value },

  get installType(): string | null { return this.state.installType },
  set installType(value) { this.state.installType = value },

  get installLabel(): string { return `Install ${this.requirementsLabelFor('install')}` },
  get uninstallLabel(): string { return `Uninstall ${this.requirementsLabelFor('uninstall')}` },

  canInstall(showMessage?: boolean): boolean {
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
        expr: () => !window.store.player.has(this),
        log: () => `${this.name} needs to be in your inventory first`
      },
      {
        expr: () => window.store.player.hasInstalledSoftwareOfType(this.installType),
        log: () => `You have already have a ${this.installType} installed`
      },
      // for files and softwares
      {
        expr: () => (this as any).isBusy,
        log: () => `${this.name} is locked while an operation is running on it`
      },
    ], showMessage, 'install')
  },

  async install(): Promise<boolean> {
    if (!this.canInstall(true)) {
      return false
    }
    window.store.game.playSound('hd2')
    log(`Installing ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('install', async () => {
      window.store.game.stopSound('hd2')
      this.installed = true
      log(`You have successfully installed ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit(this, 'onInstall')
      return true
    }, this.weight)
  },

  async onInstall(): Promise<void> {},

  canUninstall(showMessage?: boolean) {
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

  async uninstall(): Promise<boolean> {
    if (!this.canUninstall(true)) {
      return false
    }
    window.store.game.playSound('hd2')
    log(`Uninstalling ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('uninstall', async () => {
      window.store.game.stopSound('hd2')
      this.installed = false
      log(`You have successfully uninstalled ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit(this, 'onUninstall')
      return true
    }, this.weight)
  },

  async onUninstall(): Promise<void> {},
}
