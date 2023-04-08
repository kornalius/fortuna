/**
 * Add an icon state to object
 */

import compact from 'lodash/compact'
import { State } from '@/entity'

export interface IIcon {
  state: State
  get icon(): string | null
  set icon(value)
  get iconSuffix(): string | null
  set iconSuffix(value)
}

export const Icon: IIcon = {
  state: {
    icon: null,
    iconSuffix: null,
  },

  get icon(): string | null { return compact([this.state.icon, this.iconSuffix]).join('-') },
  set icon(value) { this.state.icon = value },

  get iconSuffix(): string | null { return this.state.iconSuffix },
  set iconSuffix(value) { this.state.iconSuffix = value },
}
