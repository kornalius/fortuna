import Electronic from './electronic'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Toaster extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Toaster',
      icon: 'toaster',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onUse() {
    await this.toggle()
    if (this.isOn) {
      store.game.playSound('microwave')
    }
  }
}

registerClass(Toaster)
