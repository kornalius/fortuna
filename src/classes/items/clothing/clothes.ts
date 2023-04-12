import { registerClass, mixin } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { IEquipable, IEquipableSetupData, Equipable } from '@/mixins/equipable'
import { SetupData } from '@/entity'

export interface IClothesSetupData extends IItemSetupData, IEquipableSetupData {}

export interface Clothes extends IEquipable {}

export class Clothes extends Item {
  constructor(data?: IClothesSetupData) {
    super(data)
  }

  setupInstance(data?: IClothesSetupData): SetupData | undefined {
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
