import { registerClass } from '@/utils'
import { IToolSetupData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Scisors extends Tool {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Scisors',
      icon: 'scisors',
      ...(data || {})
    })
  }
}

registerClass(Scisors)
