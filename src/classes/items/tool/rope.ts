import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Rope extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Rope',
      icon: 'rope',
      ...(data || {})
    })
  }
}

registerClass(Rope)
