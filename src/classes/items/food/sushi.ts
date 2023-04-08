import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Sushi extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sushi',
      icon: 'sushi',
      ...(data || {})
    })
  }
}

registerClass(Sushi)
