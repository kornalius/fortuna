import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class Hifi extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hifi',
      icon: 'hifi',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    await this.toggle()
    if (this.isOn) {
      window.store.game.playSound('hifi')
    }
  }
}

registerClass(Hifi)
