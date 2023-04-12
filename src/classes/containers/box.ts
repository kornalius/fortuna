import random from 'lodash/random'
import { pickRandom, mixin, registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { IDestructable, Destructable } from '@/mixins/destructable'
import { SetupData } from '@/entity'

export interface Box extends IDestructable {}

export class Box extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
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

  get isWood(): boolean { return this.iconSuffix?.startsWith('wood') || false }

  async onUse(): Promise<void> {
    if (this.isWood) {
      window.store.game.playSound('box-wood-open')
    } else {
      window.store.game.playSound('box-carton-open')
    }
  }

  async onDestroy(): Promise<void> {
    window.store.game.playSound('box-wood-destroy')
  }
}

mixin(Box, [
  Destructable,
])

registerClass(Box)
