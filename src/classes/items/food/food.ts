import { registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'
import { IConsumableSetupData } from '@/mixins/consumable'

export interface IFoodSetupData extends IItemSetupData, IConsumableSetupData {}

export class Food extends Item {
  constructor(data?: IFoodSetupData) {
    super(data)
  }

  setupInstance(data?: IFoodSetupData): SetupData | undefined {
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
