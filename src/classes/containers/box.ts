import random from 'lodash/random'
import { pickRandom, mixin, registerClass } from '@/utils'
import { Container } from './container'
import { Destructable } from '@/mixins/destructable'
import { SetupData } from '@/entity'

export interface Box extends Destructable {}

export class Box extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    const iconSuffix = pickRandom(['carton-1', 'carton-2', 'wood-1', 'wood-2', 'wood-3'])
    const isWood = iconSuffix.startsWith('wood')

    return super.setupInstance({
      name: 'Box',
      icon: 'box',
      iconSuffix,
      destructable: isWood ? random(5, 10) : 0,
      closeable: false,
      ...(data || {})
    })
  }

  get isWood(): boolean { return this.iconSuffix.startsWith('wood') }

  async onOpen() {
    if (this.isWood) {
      window.store.game.playSound('box-wood-open')
    } else {
      window.store.game.playSound('box-carton-open')
    }
  }

  async onDestroy() {
    window.store.game.playSound('box-wood-destroy')
  }
}

mixin(Box, [
  Destructable,
])

registerClass(Box)
