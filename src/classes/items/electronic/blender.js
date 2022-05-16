import Electronic from './electronic'
import { registerClass } from '@/utils'
import { store } from '@/store';

export default class Blender extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Blender',
      icon: 'blender',
      ...data,
    })
  }

  async onUse() {
    await this.toggle()
    if (this.isOn) {
      store.game.playSound('blender')
    }
  }
}

registerClass(Blender)
