import { registerClass } from '@/utils'
import { Clothes } from './clothes'
import { SetupData } from '@/entity'

export class Jeans extends Clothes {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Jeans',
      icon: 'jeans',
      ...(data || {})
    })
  }
}

registerClass(Jeans)
