import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Speaker extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Speaker',
      icon: 'speaker',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('speaker')
  }
}

registerClass(Speaker)
