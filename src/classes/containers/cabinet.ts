import { registerClass } from '@/utils'
import { Container } from './container'
import { SetupData } from '@/entity'

export class Cabinet extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cabinet',
      icon: 'safe',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onOpen() {
    window.store.game.playSound('open-drawer')
  }

  async onClose() {
    window.store.game.playSound('close-drawer')
  }
}

registerClass(Cabinet)
