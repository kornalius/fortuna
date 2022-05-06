import Item from '../item'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Speaker extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Speaker',
      icon: 'speaker',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('piano')
  }
}

registerClass(Speaker)
