import { registerClass, mixin } from '@/utils'
import { Item } from '../item'
import { IOpenable, IOpenableData, Openable } from '@/mixins/openable'
import { SetupData } from '@/entity'

export interface IWindowsData extends IOpenableData {}

export interface Windows extends IOpenable {}

export class Windows extends Item {
  constructor(data?: IWindowsData) {
    super(data)
  }

  setupInstance(data?: IWindowsData): SetupData | undefined {
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
