/**
 * Makes an object decryptable (for Files)
 */

import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { Entity, IEntityData, State } from '@/entity'
import { IName, INameData } from '@/mixins/name'
import { IIcon, IIconData } from '@/mixins/icon'
import { IVersion, IVersionData } from '@/mixins/version'
import { IOperation, IOperationData } from '@/mixins/operation'
import { IRequirements, IRequirementsData } from '@/mixins/requirements'
import { IActionsData, IDropdownItem } from '@/mixins/actions'

export interface IDecryptableData extends
  IEntityData,
  INameData,
  IIconData,
  IVersionData,
  IOperationData,
  IRequirementsData,
  IActionsData
{
  // is the object decryptable
  decryptable?: boolean
  // is the object crypted
  crypted?: boolean
  onDecrypt?: () => Promise<void>
}

export interface IDecryptable extends
  Entity,
  IName,
  IIcon,
  IVersion,
  IOperation,
  IRequirements
{
  state: State
  get isDecryptable(): boolean
  set decryptable(value: boolean)
  get isCrypted(): boolean
  set crypted(value: boolean)
  get decryptLabel(): string
  canDecrypt(showMessage?: boolean): boolean
  decrypt(): Promise<boolean>
  onDecrypt(): Promise<void>
}

// @ts-ignore
export const Decryptable: IDecryptable = {
  state: {
    decryptable: true,
    crypted: false,
    actions: [
      (item: IDecryptable): IDropdownItem | undefined => (
        item.isDecryptable && item.isCrypted
          ? {
              label: item.decryptLabel,
              key: 'decrypt',
              icon: 'decrypt',
              disabled: !item.canDecrypt(),
              click: () => item.decrypt(),
            }
          : undefined
      ),
    ],
  } as IDecryptableData,

  get isDecryptable(): boolean { return this.state.decryptable },
  set decryptable(value: boolean) { this.state.decryptable = value },

  get isCrypted(): boolean { return this.state.crypted },
  set crypted(value: boolean) { this.state.crypted = value },

  get decryptLabel(): string { return `Decrypt ${this.requirementsLabelFor('decrypt')}` },

  canDecrypt(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isDecryptable,
        log: () => `${this.nameProper} cannot be decrypted`
      },
      {
        expr: () => !this.isCrypted,
        log: () => `${this.nameProper} is not crypted`
      },
      {
        expr: () => !window.store.player.has(this),
        log: () => `${this.nameProper} must be on your disk first`
      },
      {
        expr: () => !checkSoftware(this, window.store.player.installedDecrypter,showMessage),
      },
    ], showMessage, 'decrypt')
  },

  async decrypt() {
    if (!this.canDecrypt(true)) {
      return false
    }
    log(`Decrypting file ${this.nameDisplay}...`, LOG_WARN, this.icon)
    return this.operate('decrypt', async () => {
      log(`You have successfully decrypted the file ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onDecrypt')
      this.crypted = false
      return true
    }, this.version)
  },

  async onDecrypt(): Promise<void> {},
}
