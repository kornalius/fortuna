import { pickRandom, registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Cookie extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cookie',
      icon: pickRandom(['cookie1', 'cookie2', 'cookie3']),
      ...(data || {})
    })
  }
}

registerClass(Cookie)
