import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class Wrench extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Wrench',
      icon: 'wrench',
      ...(data || {})
    })
  }
}

registerClass(Wrench)
