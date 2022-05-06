import Room from './room'
import { registerClass } from '@/utils'
import { randomItems } from '@/generators'
import LightSwitch from '@/classes/items/electronic/light-switch'
import CeilingLight from '@/classes/items/light/ceiling-light'
import Chair from '@/classes/items/furniture/chair'
import Plant from '@/classes/containers/plant'
import Painting from '@/classes/items/furniture/painting'
import Windows from '@/classes/items/furniture/windows'

export default class RandomRoom extends Room {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Random room',
      ...data,
      randomItems: [
        [LightSwitch, 1],
        [CeilingLight, 1],
        [Painting, 0, 2],
        [Windows, 1, 2],
        [Chair, 0, 2],
        [Plant, 0, 2],
        ...(data.randomItems || []),
      ],
    })
  }

  mounted() {
    super.mounted()

    if (this.state.randomItems.length > 0) {
      this.addItem(randomItems(this.state.randomItems))
    }
  }
}

registerClass(RandomRoom)
