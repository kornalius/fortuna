import { registerClass } from '@/utils'
import { Item } from '../items/item'
import { IItems } from '@/mixins/items'
import { SetupData } from '@/entity'
import { IContainerSetupData } from '@/classes/containers/container'

export interface Documents extends IItems {}

export class Documents extends Item {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Documents',
      icon: 'documents',
      openable: false,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Documents)
