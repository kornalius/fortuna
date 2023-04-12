/**
 * Make the object hidden
 */

import { emit } from '@/utils'
import { State } from '@/entity'

export interface IHiddenSetupData {
  // is the object hidden or not
  hidden?: boolean
}

export interface IHidden {
  state: State
  get isVisible(): boolean
  get isHidden(): boolean
  set hidden(value: boolean)
  show(): Promise<boolean>
  hide(): Promise<boolean>
  toggleVisibility(): Promise<boolean>
}

export const Hidden: IHidden = {
  state: {
    hidden: true,
  } as IHiddenSetupData,

  get isVisible(): boolean { return !this.isHidden },
  get isHidden(): boolean { return this.state.hidden },
  set hidden(value: boolean) { this.state.hidden = value },

  async show(): Promise<boolean> {
    this.hidden = false
    await emit(this, 'onShow')
    return true
  },

  async hide(): Promise<boolean> {
    this.hidden = true
    await emit(this, 'onHide')
    return true
  },

  async toggleVisibility(): Promise<boolean> {
    if (this.isVisible) {
      return this.hide()
    }
    return this.show()
  },
}
