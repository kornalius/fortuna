import { registerClass } from '@/utils'
import { IToolData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Screwdriver extends Tool {
  setupInstance(data?: IToolData): SetupData | undefined {
    return super.setupInstance({
      name: 'Screwdriver',
      icon: 'screwdriver',
      ...(data || {})
    })
  }
}

registerClass(Screwdriver)
