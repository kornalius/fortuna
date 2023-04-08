import { registerClass, mixin } from '@/utils'
import { Item } from '../item'
import { IEquipable, Equipable } from '@/mixins/equipable'
import { SetupData } from '@/entity'

export interface Clothes extends IEquipable {}

export class Clothes extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Clothes',
      equipable: true,
      ...(data || {})
    })
  }
}

mixin(Clothes, [
  Equipable,
])

registerClass(Clothes)
