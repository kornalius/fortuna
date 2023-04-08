import { pickRandom, registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Cookie extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cookie',
      icon: pickRandom(['cookie1', 'cookie2', 'cookie3']),
      ...(data || {})
    })
  }
}

registerClass(Cookie)
