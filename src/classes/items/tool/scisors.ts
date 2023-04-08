import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class Scisors extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Scisors',
      icon: 'scisors',
      ...(data || {})
    })
  }
}

registerClass(Scisors)
