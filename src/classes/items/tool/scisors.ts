import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Scisors extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Scisors',
      icon: 'scisors',
      ...(data || {})
    })
  }
}

registerClass(Scisors)
