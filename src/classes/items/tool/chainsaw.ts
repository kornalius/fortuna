import { registerClass } from '@/utils'
import { IToolSetupData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Chainsaw extends Tool {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Chainsaw',
      icon: 'chainsaw',
      ...(data || {})
    })
  }
}

registerClass(Chainsaw)
