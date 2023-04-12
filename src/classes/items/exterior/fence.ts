import { mixin, registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { IOpenable, IOpenableData, Openable } from '@/mixins/openable'
import { IUnlockable, IUnlockableData, Unlockable } from '@/mixins/unlockable'
import { SetupData } from '@/entity'

export interface IFenceData extends IItemData, IOpenableData, IUnlockableData {}

export interface Fence extends IOpenable, IUnlockable {}

export class Fence extends Item {
  constructor(data?: IFenceData) {
    super(data)
  }

  setupInstance(data?: IFenceData): SetupData | undefined {
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
