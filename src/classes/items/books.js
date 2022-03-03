import Item from './item'
import { registerClass } from '@/utils'

export default class Books extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Books',
      icon: 'wpf:books',
      searchable: true,
      ...data,
    })
  }
}

registerClass(Books)
