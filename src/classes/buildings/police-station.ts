import { registerClass } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class PoliceStation extends Building {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Police station',
      icon: 'police-station',
      ...(data || {})
    })
  }
}

registerClass(PoliceStation)
