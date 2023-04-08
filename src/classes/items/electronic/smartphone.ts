import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class Smartphone extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Smartphone',
      icon: 'smartphone',
      ...(data || {})
    })
  }
}

registerClass(Smartphone)
