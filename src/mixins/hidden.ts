/**
 * Make the object hidden
 */

import { emit } from '@/utils'
import { State } from '@/entity'

export interface IHiddenData {
  // is the object hidden or not
  hidden?: boolean
  onShow?: () => Promise<void>
  onHide?: () => Promise<void>
}

export interface IHidden {
  state: State
  get isVisible(): boolean
  get isHidden(): boolean
  set hidden(value: boolean)
  show(): Promise<boolean>
  onShow(): Promise<void>
  hide(): Promise<boolean>
  onHide(): Promise<void>
  toggleVisibility(): Promise<boolean>
}

export const Hidden: IHidden = {
  state: {
    hidden: true,
  } as IHiddenData,

  get isVisible(): boolean { return !this.isHidden },
  get isHidden(): boolean { return this.state.hidden },
  set hidden(value: boolean) { this.state.hidden = value },

  async show(): Promise<boolean> {
    this.hidden = false
    await emit(this, 'onShow')
    return true
  },

  async onShow(): Promise<void> {},

  async hide(): Promise<boolean> {
    this.hidden = true
    await emit(this, 'onHide')
    return true
  },

  async onHide(): Promise<void> {},

  async toggleVisibility(): Promise<boolean> {
    if (this.isVisible) {
      return this.hide()
    }
    return this.show()
  },
}
