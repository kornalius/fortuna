import { registerClass } from '@/utils'
import { IRandomRoomData, RandomRoom } from '@/classes/rooms/random-room'
import { SetupData } from '@/entity'
import { ClassDefinition } from '@/generators'
import { Box } from '@/classes/containers/box'
import { CarBattery } from '@/classes/items/electronic/car-battery'
import { Flashlight } from '@/classes/items/electronic/flashlight'
import { Radio } from '@/classes/items/electronic/radio'
import { CeilingLight } from '@/classes/items/light/ceiling-light'
import { Chainsaw } from '@/classes/items/tool/chainsaw'
import { Hammer } from '@/classes/items/tool/hammer'
import { HandDrill } from '@/classes/items/tool/hand-drill'
import { Rope } from '@/classes/items/tool/rope'
import { Screwdriver } from '@/classes/items/tool/screwdriver'
import { Wrench } from '@/classes/items/tool/wrench'
import { Extinguisher } from '@/classes/items/extinguisher'

export class RandomGarage extends RandomRoom {
  setupInstance(data?: IRandomRoomData): SetupData | undefined {
    return super.setupInstance({
      name: 'Random garage room',
      randomItems: [
        [Box, 0, 4],
        [CarBattery, 0, 2],
        [Flashlight, 0, 1],
        [Radio, 0, 1],
        [CeilingLight, 1],
        [Chainsaw, 0, 1],
        [Hammer, 0, 1],
        [HandDrill, 0, 1],
        [Rope, 0, 1],
        [Screwdriver, 0, 1],
        [Wrench, 0, 1],
        [Extinguisher, 0, 1],
        ...(data?.randomItems || []),
      ] as ClassDefinition[],
      ...(data || {}),
    })
  }
}

registerClass(RandomGarage)
