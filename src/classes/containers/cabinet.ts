import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class Cabinet extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cabinet',
      icon: 'safe',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onOpen(): Promise<void> {
    window.store.game.playSound('open-drawer')
    await super.onOpen()
  }

  async onClose(): Promise<void> {
    window.store.game.playSound('close-drawer')
    await super.onClose()
  }
}

registerClass(Cabinet)
