import Item from './item'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class CallBell extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'CallBell',
      icon: 'callBell',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('call-bell')
  }
}

registerClass(CallBell)
