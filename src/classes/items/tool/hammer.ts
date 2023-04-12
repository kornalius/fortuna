import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Hammer extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hammer',
      icon: 'hammer',
      ...(data || {})
    })
  }
}

registerClass(Hammer)
