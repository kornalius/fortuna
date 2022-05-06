import Electronic from './electronic'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Hifi extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hifi',
      icon: 'hifi',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onUse() {
    await this.toggle()
    if (this.isOn) {
      store.game.playSound('hifi')
    }
  }
}

registerClass(Hifi)
