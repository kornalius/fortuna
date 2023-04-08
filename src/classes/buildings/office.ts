import { registerClass } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Office extends Building {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Office',
      icon: 'office',
      ...(data || {})
    })
  }
}

registerClass(Office)
