import { registerClass } from '@/utils'
import { Clothes } from './clothes'
import { SetupData } from '@/entity'

export class Underwear extends Clothes {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Underwear',
      icon: 'underwear',
      ...(data || {})
    })
  }
}

registerClass(Underwear)
