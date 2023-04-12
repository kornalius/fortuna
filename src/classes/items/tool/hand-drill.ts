import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class HandDrill extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'HandDrill',
      icon: 'handDrill',
      ...(data || {})
    })
  }
}

registerClass(HandDrill)
