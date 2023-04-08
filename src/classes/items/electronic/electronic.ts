import { mixin, registerClass } from '@/utils'
import { Item } from '../item'
import { ISwitch } from '@/mixins/switch'
import { SetupData } from '@/entity'

export interface Electronic extends ISwitch {}

export class Electronic extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Electronic',
      ...(data || {})
    })
  }
}

mixin(Electronic, [
  Switch,
])

registerClass(Electronic)
