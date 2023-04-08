import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class Shovel extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Shovel',
      icon: 'shovel',
      ...(data || {})
    })
  }
}

registerClass(Shovel)
