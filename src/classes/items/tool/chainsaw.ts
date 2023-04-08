import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class Chainsaw extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Chainsaw',
      icon: 'chainsaw',
      ...(data || {})
    })
  }
}

registerClass(Chainsaw)
