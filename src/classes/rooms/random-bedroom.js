import RandomRoom from '@/classes/rooms/random-room'
import { registerClass } from '@/utils'
import Bed from '@/classes/items/furniture/bed'
import Closet from '@/classes/containers/closet'
import NightLamp from '@/classes/items/light/night-lamp'

export default class RandomBedRoom extends RandomRoom {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Random bed room',
      randomItems: [
        [Bed, 1],
        [Closet, 1, 2],
        [NightLamp, 1, 2],
        ...(data.randomItems || []),
      ],
      ...data,
    })
  }
}

registerClass(RandomBedRoom)
