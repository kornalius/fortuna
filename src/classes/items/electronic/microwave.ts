import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from './electronic'
import { SetupData } from '@/entity'

export class Microwave extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Microwave',
      icon: 'microwave',
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

registerClass(Microwave)
