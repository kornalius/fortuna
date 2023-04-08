import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Wine extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Wine',
      icon: 'wine',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('drink')
  }
}

registerClass(Wine)
