import { registerClass } from '@/utils'
import { IItemSetupData, Item } from './item'
import { SetupData } from '@/entity'

export class CallBell extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'CallBell',
      icon: 'callBell',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('call-bell')
  }
}

registerClass(CallBell)
