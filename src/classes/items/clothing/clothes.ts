import { registerClass, mixin } from '@/utils'
import { IItemData, Item } from '../item'
import { IEquipable, IEquipableData, Equipable } from '@/mixins/equipable'
import { SetupData } from '@/entity'

export interface IClothesData extends IItemData, IEquipableData {}

export interface Clothes extends IEquipable {}

export class Clothes extends Item {
  constructor(data?: IClothesData) {
    super(data)
  }

  setupInstance(data?: IClothesData): SetupData | undefined {
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
