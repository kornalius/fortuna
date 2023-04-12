import { registerClass } from '@/utils'
import { IToolSetupData, Tool } from './tool'
import { SetupData } from '@/entity'

export class HandDrill extends Tool {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'HandDrill',
      icon: 'handDrill',
      ...(data || {})
    })
  }
}

registerClass(HandDrill)
