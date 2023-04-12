import { registerClass } from '@/utils'
import { Electronic, IElectronicData } from './electronic'
import { SetupData } from '@/entity'

export class Toaster extends Electronic {
  setupInstance(data?: IElectronicData): SetupData | undefined {
    return super.setupInstance({
      name: 'Toaster',
      icon: 'toaster',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    await this.toggle()
    if (this.isOn) {
      window.store.game.playSound('microwave')
    }
  }
}

registerClass(Toaster)
