import Item from './item'
import Openable from '@/mixins/openable'
import Unlockable from '@/mixins/unlockable'
import { mixin, registerClass } from '@/utils'

export default class Fence extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Fence',
      icon: 'maki:fence',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

mixin(Fence, [
  Openable,
  Unlockable,
])

registerClass(Fence)
