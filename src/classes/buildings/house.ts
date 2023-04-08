import { registerClass } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class House extends Building {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'House',
      icon: 'house',
      ...(data || {})
    })
  }
}

registerClass(House)
