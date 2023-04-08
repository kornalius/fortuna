import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class Hammer extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hammer',
      icon: 'hammer',
      ...(data || {})
    })
  }
}

registerClass(Hammer)
