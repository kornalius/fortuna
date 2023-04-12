import { registerClass } from '@/utils'
import { Clothes, IClothesData } from './clothes'
import { SetupData } from '@/entity'

export class Socks extends Clothes {
  setupInstance(data?: IClothesData): SetupData | undefined {
    return super.setupInstance({
      name: 'Socks',
      icon: 'socks',
      ...(data || {})
    })
  }
}

registerClass(Socks)
