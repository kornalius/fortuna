import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Chainsaw extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Chainsaw',
      icon: 'chainsaw',
      ...(data || {})
    })
  }
}

registerClass(Chainsaw)
