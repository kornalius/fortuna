import { mixin, registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { IOpenable, IOpenableSetupData, Openable } from '@/mixins/openable'
import { IUnlockable, IUnlockableSetupData, Unlockable } from '@/mixins/unlockable'
import { SetupData } from '@/entity'

export interface IFenceSetupData extends IItemSetupData, IOpenableSetupData, IUnlockableSetupData {}

export interface Fence extends IOpenable, IUnlockable {}

export class Fence extends Item {
  constructor(data?: IFenceSetupData) {
    super(data)
  }

  setupInstance(data?: IFenceSetupData): SetupData | undefined {
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
