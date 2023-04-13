import { registerClass } from '@/utils'
import { IRandomRoomData, RandomRoom } from '@/classes/rooms/random-room'
import { SetupData } from '@/entity'
import { ClassDefinition } from '@/generators'
import { Box } from '@/classes/containers/box'
import { Desk } from '@/classes/containers/desk'
import { CarBattery } from '@/classes/items/electronic/car-battery'
import { Flashlight } from '@/classes/items/electronic/flashlight'
import { Radio } from '@/classes/items/electronic/radio'
import { Tv } from '@/classes/items/electronic/tv'
import { Chair } from '@/classes/items/furniture/chair'
import { Sofa } from '@/classes/items/furniture/sofa'
import { Table } from '@/classes/items/furniture/table'
import { CeilingLight } from '@/classes/items/light/ceiling-light'
import { Chainsaw } from '@/classes/items/tool/chainsaw'
import { Hammer } from '@/classes/items/tool/hammer'
import { HandDrill } from '@/classes/items/tool/hand-drill'
import { Rope } from '@/classes/items/tool/rope'
import { Screwdriver } from '@/classes/items/tool/screwdriver'
import { Wrench } from '@/classes/items/tool/wrench'

export class RandomBasement extends RandomRoom {
  setupInstance(data?: IRandomRoomData): SetupData | undefined {
    return super.setupInstance({
      name: 'Random basement room',
      randomItems: [
        [Box, 0, 2],
        [Desk, 0, 1],
        [CarBattery, 0, 2],
        [Flashlight, 0, 1],
        [Radio, 0, 1],
        [Tv, 0, 1],
        [Sofa, 0, 1],
        [Chair, 0, 2],
        [Table, 0, 2],
        [CeilingLight, 1],
        [Chainsaw, 0, 1],
        [Hammer, 0, 1],
        [HandDrill, 0, 1],
        [Rope, 0, 1],
        [Screwdriver, 0, 1],
        [Wrench, 0, 1],
        ...(data?.randomItems || []),
      ] as ClassDefinition[],
      ...(data || {}),
    })
  }
}

registerClass(RandomBasement)
