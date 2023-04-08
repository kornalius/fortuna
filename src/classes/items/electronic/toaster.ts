import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class Toaster extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Toaster',
      icon: 'toaster',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onUse() {
    await this.toggle()
    if (this.isOn) {
      window.store.game.playSound('microwave')
    }
  }
}

registerClass(Toaster)
