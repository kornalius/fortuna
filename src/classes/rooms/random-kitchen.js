import RandomRoom from '@/classes/rooms/random-room'
import { registerClass } from '@/utils'
import Fridge from '@/classes/containers/fridge'
import Dishwasher from '@/classes/containers/dishwasher'
import Table from '@/classes/items/furniture/table'
import CoffeeMaker from '@/classes/items/electronic/coffee-maker'
import Blender from '@/classes/items/electronic/blender'
import Microwave from '@/classes/items/electronic/microwave'
import Stove from '@/classes/containers/stove'

export default class RandomKitchen extends RandomRoom {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Random kitchen',
      randomItems: [
        [Fridge, 1],
        [Stove, 1],
        [Dishwasher, 0, 1],
        [Table, 1],
        [CoffeeMaker, 0, 1],
        [Blender, 0, 1],
        [Microwave, 0, 1],
        ...(data.randomItems || []),
      ],
      ...data,
    })
  }
}

registerClass(RandomKitchen)
