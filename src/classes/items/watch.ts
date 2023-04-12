import { registerClass } from '@/utils'
import { IItemSetupData, Item } from './item'
import { SetupData } from '@/entity'

export class Watch extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Watch',
      icon: 'watch',
      weight: 1,
      ...(data || {})
    })
  }
}

registerClass(Watch)
