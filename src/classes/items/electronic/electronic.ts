import { mixin, registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { ISwitch, ISwitchData, Switch } from '@/mixins/switch'
import { SetupData } from '@/entity'


export interface IElectronicData extends IItemData, ISwitchData {}

export interface Electronic extends ISwitch {}

export class Electronic extends Item {
  constructor(data?: IElectronicData) {
    super(data)
  }

  setupInstance(data?: IElectronicData): SetupData | undefined {
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
