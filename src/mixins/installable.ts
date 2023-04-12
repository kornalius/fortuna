/**
 * Make the object installable (used for Software)
 */

import { log, emit, can, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameData } from './name'
import { IIcon, IIconData } from './icon'
import { IRequirements, IRequirementsData } from './requirements'
import { IWeight, IWeightData } from './weight'
import { IOperation, IOperationData } from './operation'
import { IActions, IActionsData, IDropdownItem } from '@/mixins/actions'

export interface IInstallableData extends
  INameData,
  IIconData,
  IRequirementsData,
  IWeightData,
  IOperationData,
  IActionsData
{
  // is the object installable
  installable?: boolean
  // has the object been installed
  installed?: boolean
  // type name of install (can only install one per type)
  installType?: string | null
  onInstall?: () => Promise<void>
  onUninstall?: () => Promise<void>
}

export interface IInstallable extends
  IName,
  IIcon,
  IRequirements,
  IWeight,
  IOperation,
  IActions
{
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
    installable: false,
    installed: false,
    installType: null,
    actions: [
      (item: IInstallable): IDropdownItem | undefined => (
        item.isInstallable
          ? {
            label: item.installLabel,
            key: 'install',
            icon: 'install',
            disabled: !item.canInstall(),
            click: () => item.install(),
          }
        : undefined
      ),
      (item: IInstallable): IDropdownItem | undefined => (
        item.isInstallable
          ? {
            label: item.uninstallLabel,
            key: 'uninstall',
            icon: 'uninstall',
            disabled: !item.canUninstall(),
            click: () => item.uninstall(),
          }
          : undefined
      ),
    ],
  } as IInstallableData,

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
        log: () => `${this.nameProper} cannot be installed`
      },
      {
        expr: () => this.isInstalled,
        log: () => `${this.nameProper} is already installed`
      },
      {
        expr: () => !window.store.player.has(this),
        log: () => `${this.nameProper} needs to be in your inventory first`
      },
      {
        expr: () => window.store.player.hasInstalledSoftwareOfType(this.installType),
        log: () => `You have already have a ${this.installType} installed`
      },
      // for files and softwares
      {
        expr: () => (this as any).isBusy,
        log: () => `${this.nameProper} is locked while an operation is running on it`
      },
    ], showMessage, 'install')
  },

  async install(): Promise<boolean> {
    if (!this.canInstall(true)) {
      return false
    }
    window.store.game.playSound('hd2')
    log(`Installing ${this.nameDisplay}...`, LOG_WARN, this.icon)
    return this.operate('install', async () => {
      window.store.game.stopSound('hd2')
      this.installed = true
      log(`You have successfully installed ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onInstall')
      return true
    }, this.weight)
  },

  async onInstall(): Promise<void> {},

  canUninstall(showMessage?: boolean) {
    return can(this, [
      {
        expr: () => !this.isInstallable,
        log: () => `${this.nameProper} cannot be uninstalled`
      },
      {
        expr: () => !this.isInstalled,
        log: () => `${this.nameProper} is not installed`
      },
      // for files and softwares
      {
        expr: () => this.isBusy,
        log: () => `${this.nameProper} is locked while an operation is running on it`
      },
    ], showMessage, 'uninstall')
  },

  async uninstall(): Promise<boolean> {
    if (!this.canUninstall(true)) {
      return false
    }
    window.store.game.playSound('hd2')
    log(`Uninstalling ${this.nameDisplay}...`, LOG_WARN, this.icon)
    return this.operate('uninstall', async () => {
      window.store.game.stopSound('hd2')
      this.installed = false
      log(`You have successfully uninstalled ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onUninstall')
      return true
    }, this.weight)
  },

  async onUninstall(): Promise<void> {},
}
