import { registerClass } from '@/utils'
import { RandomRoom } from '@/classes/rooms/random-room'
import { Sofa } from '@/classes/items/furniture/sofa'
import { Tv } from '@/classes/items/electronic/tv'
import { Radio } from '@/classes/items/electronic/radio'
import { Piano } from '@/classes/items/electronic/piano'
import { Hifi } from '@/classes/items/electronic/hifi'
import { Speaker } from '@/classes/items/electronic/speaker'
import { Fireplace } from '@/classes/items/electronic/fireplace'
import { SetupData } from '@/entity'

export class RandomLivingRoom extends RandomRoom {
  setupInstance(data?: SetupData): SetupData | undefined {
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
        ...(data?.randomItems || []),
      ],
      ...(data || {}),
    })
  }
}

registerClass(RandomLivingRoom)
