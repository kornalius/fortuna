import { registerClass } from '@/utils'
import { Clothes } from './clothes'
import { SetupData } from '@/entity'

export class Snickers extends Clothes {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Snickers',
      icon: 'snickers',
      ...(data || {})
    })
  }
}

registerClass(Snickers)
