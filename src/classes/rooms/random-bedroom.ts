import { registerClass } from '@/utils'
import { IRandomRoomData, RandomRoom } from '@/classes/rooms/random-room'
import { SetupData } from '@/entity'
import { ClassDefinition } from '@/generators'
import { Bed } from '@/classes/items/furniture/bed'
import { Closet } from '@/classes/containers/closet'
import { NightLamp } from '@/classes/items/light/night-lamp'
import { TissueBox } from '@/classes/containers/tissue-box'
import { Painting } from '@/classes/items/furniture/painting'
import { TrashCan } from '@/classes/containers/trash-can'
import { Plant } from '@/classes/containers/plant'

export class RandomBedRoom extends RandomRoom {
  setupInstance(data?: IRandomRoomData): SetupData | undefined {
    return super.setupInstance({
      name: 'Random bed room',
      randomItems: [
        [Bed, 1],
        [Closet, 1, 2],
        [NightLamp, 1, 2],
        [TissueBox, 0, 1],
        [Painting, 0, 2],
        [TrashCan, 0, 1],
        [Plant, 0, 2],
        ...(data?.randomItems || []),
      ] as ClassDefinition[],
      ...(data || {}),
    })
  }
}

registerClass(RandomBedRoom)
