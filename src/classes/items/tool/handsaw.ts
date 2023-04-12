import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Handsaw extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Handsaw',
      icon: 'handsaw',
      ...(data || {})
    })
  }
}

registerClass(Handsaw)
