import random from 'lodash/random'
import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'
import { search } from '@/generators'
import DeskLamp from '@/classes/items/light/desk-lamp'
import Pc from '@/classes/items/electronics/pc'
import Laptop from '@/classes/items/electronics/laptop'

export default class Desk extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Desk',
      icon: 'desk',
      wood: random(0, 1),
      openable: false,
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  get icon() { return `${this.icon}-${this.wood ? '-wood' : '-metal'}` }

  get wood() { return this.state.wood }
  set wood(value) { this.state.wood = value }

  async onSearch() {
    await super.onSearch()
    search(this, [
      { klass: DeskLamp, qty: [0, 1] },
      { klass: Pc, qty: [0, 1] },
      { klass: Laptop, qty: [0, 1] },
    ])
  }
}

registerClass(Desk)
