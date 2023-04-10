import { registerClass } from '@/utils'
import { ClassDefinition, randomItems } from '@/generators'
import { Room } from './room'
import { LightSwitch } from '@/classes/items/electronic/light-switch'
import { CeilingLight } from '@/classes/items/light/ceiling-light'
import { Chair } from '@/classes/items/furniture/chair'
import { Plant } from '@/classes/containers/plant'
import { Painting } from '@/classes/items/furniture/painting'
import { Windows } from '@/classes/items/furniture/windows'
import { TrashCan } from '@/classes/containers/trash-can'
import { Table } from '@/classes/items/furniture/table'
import { SetupData } from '@/entity'

export class RandomRoom extends Room {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Random room',
      ...(data || {}),
      randomItems: [
        [LightSwitch, 1],
        [CeilingLight, 1],
        [Painting, 0, 2],
        [Windows, 1, 2],
        [Chair, 0, 2],
        [Plant, 0, 2],
        [TrashCan, 0, 1],
        [Table, 0, 1],
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
