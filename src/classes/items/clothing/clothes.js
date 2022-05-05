import Item from '../item'
import { registerClass, mixin } from '@/utils'
import Equipable from '@/mixins/equipable'

export default class Clothes extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Clothes',
      equipable: true,
      ...data,
    })
  }
}

mixin(Clothes, [
  Equipable,
])

registerClass(Clothes)
