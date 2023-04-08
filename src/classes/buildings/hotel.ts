import { registerClass } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Hotel extends Building {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hotel',
      icon: 'hotel',
      ...(data || {})
    })
  }
}

registerClass(Hotel)
