import { registerClass } from '@/utils'
import { Item } from './item'
import { SetupData } from '@/entity'

export class Watch extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Watch',
      icon: 'watch',
      weight: 1,
      ...(data || {})
    })
  }
}

registerClass(Watch)
