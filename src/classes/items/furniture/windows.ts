import { registerClass, mixin } from '@/utils'
import { Item } from '../item'
import { IOpenable, Openable } from '@/mixins/openable'
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

  async onOpen(): Promise<void> {
    window.store.game.playSound('open-window')
  }

  async onClose(): Promise<void> {
    window.store.game.playSound('close-window')
  }
}

mixin(Windows, [
  Openable,
])

registerClass(Windows)
