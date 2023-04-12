import { registerClass } from '@/utils'
import { IToolSetupData, Tool } from './tool'
import { SetupData } from '@/entity'

export class Screwdriver extends Tool {
  setupInstance(data?: IToolSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Screwdriver',
      icon: 'screwdriver',
      ...(data || {})
    })
  }
}

registerClass(Screwdriver)
