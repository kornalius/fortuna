import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class SodaCan extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'SodaCan',
      icon: 'sodaCan',
      ...(data || {})
    })
  }

  async onUse() {
    window.store.game.playSound('drink')
  }
}

registerClass(SodaCan)
