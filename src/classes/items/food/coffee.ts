import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Coffee extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Coffee',
      icon: 'coffee',
      ...(data || {})
    })
  }

  async onUse() {
    window.store.game.playSound('drink')
  }
}

registerClass(Coffee)
