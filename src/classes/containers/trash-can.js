import Container from './container'
import { registerClass } from '@/utils'

export default class TrashCan extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'TrashCan',
      icon: 'trash-can',
      ...data,
    })
  }
}

registerClass(TrashCan)
