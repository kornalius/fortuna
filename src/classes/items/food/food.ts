import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'
import { IConsumableData } from '@/mixins/consumable'

export interface IFoodData extends IItemData, IConsumableData {}

export class Food extends Item {
  constructor(data?: IFoodData) {
    super(data)
  }

  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Food',
      consumable: 1,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('eat')
  }
}

registerClass(Food)
