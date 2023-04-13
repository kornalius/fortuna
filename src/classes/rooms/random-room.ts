import { registerClass } from '@/utils'
import { ClassDefinition, randomItems } from '@/generators'
import { IRoomData, Room } from './room'
import { SetupData } from '@/entity'
import { LightSwitch } from '@/classes/items/electronic/light-switch'
import { CeilingLight } from '@/classes/items/light/ceiling-light'
import { Windows } from '@/classes/items/furniture/windows'

export interface IRandomRoomData extends IRoomData {
  randomItems?: ClassDefinition[]
}

export class RandomRoom extends Room {
  constructor(data?: IRandomRoomData) {
    super(data)
  }

  setupInstance(data?: IRandomRoomData): SetupData | undefined {
    return super.setupInstance({
      name: 'Random room',
      ...(data || {}),
      randomItems: [
        [LightSwitch, 1],
        [CeilingLight, 1],
        [Windows, 1, 2],
        ...(data?.randomItems || []),
      ] as ClassDefinition[],
    })
  }

  mounted(): void {
    super.mounted()

    if (this.state.randomItems.length > 0) {
      this.addItem(randomItems(this.state.randomItems))
    }
  }
}

registerClass(RandomRoom)
