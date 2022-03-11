import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'
import { store } from '@/store';

export default class Safe extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Safe',
      icon: 'safe',
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

registerClass(Safe)
