import { registerClass, mixin } from '@/utils'
import { Item } from '../item'
import { IOpenable } from '@/mixins/openable'
import { SetupData } from '@/entity'

export interface Windows extends IOpenable {}

export class Windows extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Windows',
      icon: 'window',
      openIconSuffix: true,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onOpen() {
    window.store.game.playSound('open-window')
  }

  async onClose() {
    window.store.game.playSound('close-window')
  }
}

mixin(Windows, [
  Openable,
])

registerClass(Windows)
