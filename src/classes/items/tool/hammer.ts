import { registerClass } from '@/utils'
import { IToolSetupData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Hammer extends Tool {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hammer',
      icon: 'hammer',
      ...(data || {})
    })
  }
}

registerClass(Hammer)
