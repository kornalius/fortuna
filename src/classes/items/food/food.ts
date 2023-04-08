import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Food extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Food',
      consumable: true,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('eat')
  }
}

registerClass(Food)
