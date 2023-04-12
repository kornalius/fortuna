import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Wrench extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Wrench',
      icon: 'wrench',
      ...(data || {})
    })
  }
}

registerClass(Wrench)
