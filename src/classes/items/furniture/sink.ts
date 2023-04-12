import { registerClass } from '@/utils'
import { Container, IContainerData } from '@/classes/containers/container'
import { SetupData } from '@/entity'

export class Sink extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
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
