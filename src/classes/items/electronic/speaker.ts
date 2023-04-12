import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from '@/classes/items/electronic/electronic'
import { SetupData } from '@/entity'

export class Speaker extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
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
