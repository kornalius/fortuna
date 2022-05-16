import Electronic from './electronic'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Fireplace extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Fireplace',
      icon: 'fireplace',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onUse() {
    await this.toggle()
    if (this.isOn) {
      store.game.playSound('fireplace')
    }
  }
}

registerClass(Fireplace)
