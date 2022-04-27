import Food from './food'
import { pickRandom, registerClass } from '@/utils'

export default class Cookie extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cookie',
      icon: pickRandom(['cookie1', 'cookie2', 'cookie3']),
      ...data,
    })
  }
}

registerClass(Cookie)
