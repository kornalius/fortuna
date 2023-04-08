import { pickRandom, registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Apple extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Apple',
      icon: pickRandom(['apple', 'appleGreen']),
      ...(data || {})
    })
  }
}

registerClass(Apple)
