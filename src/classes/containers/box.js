import random from 'lodash/random'
import Container from './container'
import { pickRandom, mixin, registerClass } from '@/utils'
import Destructable from '@/mixins/destructable'
import { store } from '@/store'

export default class Box extends Container {
  setupInstance(data) {
    const iconSuffix = pickRandom(['carton-1', 'carton-2', 'wood-1', 'wood-2', 'wood-3'])
    const isWood = iconSuffix.startsWith('wood')

    return super.setupInstance({
      name: 'Box',
      icon: 'box',
      iconSuffix,
      destructable: isWood ? random(5, 10) : 0,
      closeable: false,
      ...data,
    })
  }

  get isWood() { return this.iconSuffix.startsWith('wood') }

  async onOpen() {
    if (this.isWood) {
      store.game.playSound('box-wood-open')
    } else {
      store.game.playSound('box-carton-open')
    }
  }

  async onDestroy() {
    store.game.playSound('box-wood-destroy')
  }
}

mixin(Box, [
  Destructable,
])

registerClass(Box)
