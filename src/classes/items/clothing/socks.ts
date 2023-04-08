import { registerClass } from '@/utils'
import { Clothes } from './clothes'
import { SetupData } from '@/entity'

export class Socks extends Clothes {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Socks',
      icon: 'socks',
      ...(data || {})
    })
  }
}

registerClass(Socks)
