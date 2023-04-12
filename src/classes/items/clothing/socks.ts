import { registerClass } from '@/utils'
import { Clothes, IClothesSetupData } from './clothes'
import { SetupData } from '@/entity'

export class Socks extends Clothes {
  setupInstance(data?: IClothesSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Socks',
      icon: 'socks',
      ...(data || {})
    })
  }
}

registerClass(Socks)
