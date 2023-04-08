import { mixin, registerClass } from '@/utils'
import { Item } from '../item'
import { IOpenable, Openable } from '@/mixins/openable'
import { IUnlockable, Unlockable } from '@/mixins/unlockable'
import { SetupData } from '@/entity'

export interface Fence extends IOpenable, IUnlockable {}

export class Fence extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Fence',
      icon: 'fence',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

mixin(Fence, [
  Openable,
  Unlockable,
])

registerClass(Fence)
