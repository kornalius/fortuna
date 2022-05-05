import Container from './container'
import { registerClass } from '@/utils'

export default class PostalBox extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'PostalBox',
      icon: 'postal-box',
      ...data,
    })
  }
}

registerClass(PostalBox)
