import Item from '../item'
import { registerClass } from '@/utils'
import { store } from '@/store';

export default class Piano extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Piano',
      icon: 'piano',
      usable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('piano')
  }
}

registerClass(Piano)
