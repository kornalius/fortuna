import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class HandDrill extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'HandDrill',
      icon: 'handDrill',
      ...(data || {})
    })
  }
}

registerClass(HandDrill)
