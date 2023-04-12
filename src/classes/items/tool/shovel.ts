import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Shovel extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Shovel',
      icon: 'shovel',
      ...(data || {})
    })
  }
}

registerClass(Shovel)
