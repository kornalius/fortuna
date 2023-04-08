import { registerClass } from '@/utils'
import { Clothes } from './clothes'
import { SetupData } from '@/entity'

export class Boots extends Clothes {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Boots',
      icon: 'boots',
      ...(data || {})
    })
  }
}

registerClass(Boots)