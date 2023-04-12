import { registerClass } from '@/utils'
import { IRandomRoomData, RandomRoom } from '@/classes/rooms/random-room'
import { Bed } from '@/classes/items/furniture/bed'
import { Closet } from '@/classes/containers/closet'
import { NightLamp } from '@/classes/items/light/night-lamp'
import { SetupData } from '@/entity'
import { ClassDefinition } from '@/generators'

export class RandomBedRoom extends RandomRoom {
  setupInstance(data?: IRandomRoomData): SetupData | undefined {
    return super.setupInstance({
      name: 'Random bed room',
      randomItems: [
        [Bed, 1],
        [Closet, 1, 2],
        [NightLamp, 1, 2],
        ...(data?.randomItems || []),
      ] as ClassDefinition[],
      ...(data || {}),
    })
  }
}

registerClass(RandomBedRoom)
