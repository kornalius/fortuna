/**
 * Makes an object usable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { Entity, State } from '@/entity'
import { IName, INameSetupData } from './name'
import { IRequirements, IRequirementsSetupData } from './requirements'
import { IActions, IActionsSetupData, IDropdownItem } from '@/mixins/actions'

export interface IUsableSetupData extends
  INameSetupData,
  IRequirementsSetupData,
  IActionsSetupData
{
  // is the object usable
  usable?: boolean
  // limit to the number of uses allowed, -1 means can be used as many times as wanted
  uses?: number
  onUse?: () => Promise<void>
}

export interface IUsable extends
  IName,
  IRequirements,
  IActions,
  Entity
{
  state: State
  get isUsable(): boolean
  set usable(value: boolean)
  get uses(): number
  set uses(value)
  get hasUnlimitedUses(): boolean
  get useLabel(): string
  canUse(showMessage?: boolean): boolean
  use(): Promise<boolean>
  onUse(): Promise<void>
}

// @ts-ignore
export const Usable: IUsable = {
  state: {
    usable: false,
    uses: -1,
    actions: [
      (item: IUsable): IDropdownItem | undefined => (
        item.isUsable
          ? {
            label: item.useLabel,
            key: 'use',
            icon: 'use',
            disabled: !item.canUse(),
            click: () => item.use(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'use', dex: 1 },
    ],
  } as IUsableSetupData,

  get isUsable(): boolean { return this.state.usable },
  set usable(value: boolean) { this.state.usable = value },

  get uses(): number { return this.state.uses },
  set uses(value) { this.state.uses = value },

  get hasUnlimitedUses(): boolean { return this.uses === -1 },

  get useLabel(): string { return `Use ${this.requirementsLabelFor('use')}` },

  canUse(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isUsable,
        log: () => `${this.nameProper} cannot be used`
      },
      // battle item can only be used in combat
      {
        expr: () => !window.store.player.isInCombat && (this as any).isBattle,
        log: () => `${this.nameProper} can only be used during combat`
      },
      // only battle item can be used in combat
      {
        expr: () => window.store.player.isInCombat && !(this as any).isBattle,
        log: () => `${this.nameProper} can only be used outside of combat`
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot use this while in conversation'
      },
    ], showMessage, 'use')
  },

  async use(): Promise<boolean> {
    if (!this.canUse(true)) {
      return false
    }

    log(`You use the ${this.nameDisplay}`, LOG_WARN, this.icon)
    await emit(this, 'onUse')

    if (!this.hasUnlimitedUses) {
      this.uses -= 1
      if (this.uses <= 0) {
        this.remove()
      }
    }
    return true
  },

  async onUse(): Promise<void> {},
}
