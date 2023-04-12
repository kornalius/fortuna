import { mixin, registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { ISwitch, ISwitchSetupData, Switch } from '@/mixins/switch'
import { SetupData } from '@/entity'


export interface IElectronicSetupData extends IItemSetupData, ISwitchSetupData {}

export interface Electronic extends ISwitch {}

export class Electronic extends Item {
  constructor(data?: IElectronicSetupData) {
    super(data)
  }

  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
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
