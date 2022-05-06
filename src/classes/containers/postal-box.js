import Container from './container'
import { registerClass } from '@/utils'

export default class PostalBox extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'PostalBox',
      icon: 'postal-box',
      openable: false,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(PostalBox)
