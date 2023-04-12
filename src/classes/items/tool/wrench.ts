import { registerClass } from '@/utils'
import { IToolSetupData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Wrench extends Tool {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Wrench',
      icon: 'wrench',
      ...(data || {})
    })
  }
}

registerClass(Wrench)
