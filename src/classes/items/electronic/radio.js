import Electronic from './electronic'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Radio extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Radio',
      icon: 'radio',
      usable: true,
      ...data,
    })
  }

  async onUse() {
    await this.toggle()
    if (this.isOn) {
      store.game.playSound('radio')
    }
  }
}

registerClass(Radio)
