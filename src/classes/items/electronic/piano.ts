import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Piano extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Piano',
      icon: 'piano',
      usable: true,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('piano')
  }
}

registerClass(Piano)
