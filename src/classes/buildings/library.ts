import { registerClass } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Library extends Building {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Library',
      icon: 'library',
      ...(data || {})
    })
  }
}

registerClass(Library)
