import { registerClass } from '@/utils'
import { IToolSetupData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Shovel extends Tool {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Shovel',
      icon: 'shovel',
      ...(data || {})
    })
  }
}

registerClass(Shovel)
