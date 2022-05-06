import Container from './container'
import { registerClass } from '@/utils'

export default class TrashCan extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'TrashCan',
      icon: 'trash-can',
      openable: false,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(TrashCan)
