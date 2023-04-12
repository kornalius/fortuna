import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from './electronic'
import { SetupData } from '@/entity'

export class Radio extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Radio',
      icon: 'radio',
      usable: true,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    await this.toggle()
    if (this.isOn) {
      window.store.game.playSound('radio')
    }
  }
}

registerClass(Radio)
