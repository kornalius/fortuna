/**
 * Adds an on/off state to the object
 */

import compact from 'lodash/compact'
import { log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameSetupData } from './name'
import { IIcon, IIconSetupData } from './icon'
import { IRequirements, IRequirementsSetupData } from './requirements'
import { ILocation, ILocationSetupData } from './location'
import { IUsable, IUsableSetupData } from './usable'
import { IExaminable, IExaminableSetupData } from './examinable'
import { IPickableSetupData } from '@/mixins/pickable'

export interface ISwitchSetupData extends
  INameSetupData,
  IIconSetupData,
  IExaminableSetupData,
  IUsableSetupData,
  IRequirementsSetupData,
  ILocationSetupData,
  IPickableSetupData
{
  // is the object off
  off?: boolean
  // the object is usable by default
  usable?: boolean
  // if the icon should be suffixed with switch state -on or -off
  switchIconSuffix?: boolean
  onUse?: () => Promise<void>
  onExamine?: () => Promise<void>
}

export interface ISwitch extends
  IName,
  IIcon,
  IExaminable,
  IUsable,
  IRequirements,
  ILocation
{
  state: State
  get isOn(): boolean
  set isOn(value)
  get isOff(): boolean
  set isOff(value)
  get switchIconSuffix(): string | null
  set switchIconSuffix(value)
  get iconSuffix(): string | null
  set iconSuffix(value)
  toggle(): Promise<boolean>
  onUse(): Promise<void>
  onExamine(): Promise<void>
}

// @ts-ignore
export const Switch: ISwitch = {
  state: {
    off: true,
    usable: true,
    switchIconSuffix: true,
    pickable: false,
  } as ISwitchSetupData,

  get isOn(): boolean { return !this.state.off },
  set isOn(value) { this.state.off = !value },

  get isOff(): boolean { return this.state.off },
  set isOff(value) { this.state.off = value },

  get switchIconSuffix(): string | null { return this.state.switchIconSuffix },
  set switchIconSuffix(value) { this.state.switchIconSuffix = value },

  get iconSuffix(): string | null {
    if (!this.switchIconSuffix) {
      return this.state.iconSuffix
    }
    return compact([this.state.iconSuffix, this.isOn ? 'on' : 'off']).join('-')
  },
  set iconSuffix(value) { this.state.iconSuffix = value },

  async toggle(): Promise<boolean> {
    if (!this.canUse(true)) {
      log(`You cannot toggle the ${this.nameDisplay}`, LOG_WARN, this.icon)
      return false
    }
    window.store.game.playSound('switch')
    this.isOn = !this.isOn
    return true
  },

  async onUse(): Promise<void> {
    await this.toggle()
  },

  async onExamine(): Promise<void> {
    log([
      this.isOn ? 'It is ON' : 'It is OFF',
    ], 0, this.icon)
    // return super.onExamine()
  },
}
