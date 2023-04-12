import { registerClass } from '@/utils'
import { Electronic, IElectronicData } from '@/classes/items/electronic/electronic'
import { SetupData } from '@/entity'

export class Piano extends Electronic {
  setupInstance(data?: IElectronicData): SetupData | undefined {
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
