import { registerClass, mixin } from '@/utils'
import { Item } from '../item'
import { IOpenable, IOpenableSetupData, Openable } from '@/mixins/openable'
import { SetupData } from '@/entity'

export interface IWindowsSetupData extends IOpenableSetupData {}

export interface Windows extends IOpenable {}

export class Windows extends Item {
  constructor(data?: IWindowsSetupData) {
    super(data)
  }

  setupInstance(data?: IWindowsSetupData): SetupData | undefined {
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
