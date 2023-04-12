import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from '@/classes/items/electronic/electronic'
import { SetupData } from '@/entity'

export class Piano extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
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
