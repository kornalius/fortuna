/**
 * Makes an object sleeping
 */

import { can, emit } from '@/utils'
import { State } from '@/entity'
import { IName, INameSetupData } from './name'
import { IIcon, IIconSetupData } from './icon'
import { IRequirements, IRequirementsSetupData } from './requirements'
import { ILocation, ILocationSetupData } from './location'

export interface ISleepSetupData extends
  INameSetupData,
  IIconSetupData,
  IRequirementsSetupData,
  ILocationSetupData
{
  // is the object sleeping or not
  sleeping?: boolean
}
export interface ISleep extends
  IName,
  IIcon,
  IRequirements,
  ILocation
{
  state: State
  get isSleeping(): boolean
  set sleeping(value: boolean)
  canSleep(showMessage?: boolean): boolean
  sleep(): Promise<boolean>
  onSleep(): Promise<void>
  canWake(showMessage?: boolean): boolean
  wake(): Promise<boolean>
  onWake(): Promise<void>
}

// @ts-ignore
export const Sleep: ISleep = {
  state: {
    sleeping: false,
  } as ISleepSetupData,

  get isSleeping(): boolean { return this.state.sleeping },
  set sleeping(value: boolean) { this.state.sleeping = value },

  canSleep(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.isSleeping,
        log: () => `${this.nameProper} is already asleep`,
      },
      {
        expr: () => this.location?.canSleepOnItems().length === 0,
        log: () => 'No suitable furniture to go to sleep',
      },
    ], showMessage)
  },

  async sleep(): Promise<boolean> {
    if (!this.canSleep(true)) {
      return false
    }
    this.sleeping = true
    await emit(this, 'onSleep')
    return true
  },

  async onSleep(): Promise<void> {},

  canWake(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isSleeping,
        log: () => `${this.nameProper} is not sleeping`,
      },
    ], showMessage)
  },

  async wake(): Promise<boolean> {
    if (!this.canWake(true)) {
      return false
    }
    this.sleeping = false
    await emit(this, 'onWake')
    return true
  },

  async onWake(): Promise<void> {},
}
