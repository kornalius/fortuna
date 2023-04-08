import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class Blender extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Blender',
      icon: 'blender',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    await this.toggle()
    if (this.isOn) {
      window.store.game.playSound('blender')
    }
  }
}

registerClass(Blender)
