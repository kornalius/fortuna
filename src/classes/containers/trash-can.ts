import { registerClass } from '@/utils'
import { Container } from './container'
import { SetupData } from '@/entity'

export class TrashCan extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'TrashCan',
      icon: 'trash-can',
      openable: false,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(TrashCan)
