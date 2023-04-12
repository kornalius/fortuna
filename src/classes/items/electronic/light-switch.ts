import { log, registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from './electronic'
import { SetupData } from '@/entity'

export class LightSwitch extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Light switch',
      icon: 'lightSwitch',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onExamine(): Promise<void> {
    log('It\'s a normal looking light switch, nothing special about it other than the little button in the middle', 0, this.icon)
  }
}

registerClass(LightSwitch)
