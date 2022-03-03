import Container from '@/classes/containers/container'
import { mixin, registerClass } from '@/utils'
import Pickable from '@/mixins/pickable'
import Dropable from '@/mixins/dropable'

export default class PillsBottle extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Pills bottle',
      icon: 'fa-solid:prescription-bottle-alt',
      ...data,
    })
  }
}

mixin(PillsBottle, [
  Pickable,
  Dropable,
])

registerClass(PillsBottle)
