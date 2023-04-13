import { registerClass } from '@/utils'
import { IRandomRoomData, RandomRoom } from '@/classes/rooms/random-room'
import { SetupData } from '@/entity'
import { ClassDefinition } from '@/generators'
import { Sofa } from '@/classes/items/furniture/sofa'
import { Tv } from '@/classes/items/electronic/tv'
import { Radio } from '@/classes/items/electronic/radio'
import { Piano } from '@/classes/items/electronic/piano'
import { Hifi } from '@/classes/items/electronic/hifi'
import { Speaker } from '@/classes/items/electronic/speaker'
import { Fireplace } from '@/classes/items/electronic/fireplace'
import { Painting } from '@/classes/items/furniture/painting'
import { Chair } from '@/classes/items/furniture/chair'
import { Plant } from '@/classes/containers/plant'
import { Table } from '@/classes/items/furniture/table'
import { TrashCan } from '@/classes/containers/trash-can'

export class RandomLivingRoom extends RandomRoom {
  setupInstance(data?: IRandomRoomData): SetupData | undefined {
    return super.setupInstance({
      name: 'Random living room',
      randomItems: [
        [Sofa, 1, 2],
        [Tv, 0, 1],
        [Radio, 0, 1],
        [Piano, 0, 1],
        [Hifi, 0, 1],
        [Speaker, 0, 2],
        [Fireplace, 0, 1],
        [Painting, 0, 2],
        [Chair, 0, 2],
        [Plant, 0, 2],
        [Table, 0, 1],
        [TrashCan, 0, 1],
        ...(data?.randomItems || []),
      ] as ClassDefinition[],
      ...(data || {}),
    })
  }
}

registerClass(RandomLivingRoom)
