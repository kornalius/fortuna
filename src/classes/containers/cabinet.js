import Container from './container'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Cabinet extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cabinet',
      icon: 'safe',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onOpen() {
    store.game.playSound('open-drawer')
  }

  async onClose() {
    store.game.playSound('close-drawer')
  }
}

registerClass(Cabinet)
