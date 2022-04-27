import Item from '../item'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class Electronic extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Electronic',
      ...data,
    })
  }
}

mixin(Electronic, [
  Switch,
])

registerClass(Electronic)
