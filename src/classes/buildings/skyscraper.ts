import { registerClass } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Skyscraper extends Building {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Skyscraper',
      icon: 'skyscraper',
      ...(data || {})
    })
  }
}

registerClass(Skyscraper)