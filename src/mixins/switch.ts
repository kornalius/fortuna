/**
 * Adds an on/off state to the object
 */

import compact from 'lodash/compact'
import { log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from './name'
import { IIcon } from './icon'
import { IRequirements } from './requirements'
import { ILocation } from './location'
import { IUsable } from './usable'
import { IExaminable } from './examinable'

export interface ISwitch extends IName, IIcon, IExaminable, IUsable, IRequirements, ILocation {
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
    // is the object off
    off: true,
    // the object is usable by default
    usable: true,
    // if the icon should be suffixed with switch state -on or -off
    switchIconSuffix: true,
    pickable: false,
  },

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
      log(`You cannot toggle the ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
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
