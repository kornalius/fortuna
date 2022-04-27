import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'
import { store } from '@/store';

export default class Sink extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Sink',
      icon: 'sink',
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('sink')
  }
}

registerClass(Sink)
