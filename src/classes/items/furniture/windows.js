import Item from '../item'
import { registerClass, mixin } from '@/utils'
import Openable from '@/mixins/openable'
import { store } from '@/store'

export default class Windows extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Windows',
      icon: 'window',
      openIconSuffix: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onOpen() {
    store.game.playSound('open-window')
  }

  async onClose() {
    store.game.playSound('close-window')
  }
}

mixin(Windows, [
  Openable,
])

registerClass(Windows)
