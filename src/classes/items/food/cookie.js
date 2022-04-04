import Food from './food'
import { registerClass } from '@/utils'

export default class Cookie extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cookie',
      icon: 'cookie',
      ...data,
    })
  }
}

registerClass(Cookie)
