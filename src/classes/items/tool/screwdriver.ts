import { registerClass } from '@/utils'
import { Tool } from './tool'
import { SetupData } from '@/entity'

export class Screwdriver extends Tool {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Screwdriver',
      icon: 'screwdriver',
      ...(data || {})
    })
  }
}

registerClass(Screwdriver)
