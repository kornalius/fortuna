import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class Rope extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Rope',
      icon: 'rope',
      ...(data || {})
    })
  }
}

registerClass(Rope)
