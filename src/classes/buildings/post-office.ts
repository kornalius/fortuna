import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class PostOffice extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'PostOffice',
      icon: 'post-office',
      ...(data || {})
    })
  }
}

registerClass(PostOffice)
