import { pickRandom, registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Apple extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Apple',
      icon: pickRandom(['apple', 'appleGreen']),
      ...(data || {})
    })
  }
}

registerClass(Apple)
