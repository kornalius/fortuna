import { registerClass } from '@/utils'
import { Container } from '@/classes/containers/container'
import { SetupData } from '@/entity'

export class Sink extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sink',
      icon: 'sink',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('sink')
  }
}

registerClass(Sink)
