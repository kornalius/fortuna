import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class TrashCan extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
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
