import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class Handsaw extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Handsaw',
      icon: 'handsaw',
      ...(data || {})
    })
  }
}

registerClass(Handsaw)
