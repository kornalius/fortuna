import random from 'lodash/random'
import { pickRandom, registerClass } from '@/utils'
import { search } from '@/generators'
import { Container, IContainerData } from '@/classes/containers/container'
import { DeskLamp } from '@/classes/items/light/desk-lamp'
import { Pc } from '@/classes/items/electronic/pc'
import { Laptop } from '@/classes/items/electronic/laptop'
import { SetupData } from '@/entity'

export class Desk extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    const iconSuffix = pickRandom(['wood', 'metal'])
    const isWood = iconSuffix.startsWith('wood')

    return super.setupInstance({
      name: 'Desk',
      icon: 'desk',
      iconSuffix,
      destructable: isWood ? random(15, 25) : 0,
      openable: false,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    await super.onSearch()
    search(this, [
      { klass: DeskLamp, qty: [0, 1] },
      { klass: Pc, qty: [0, 1] },
      { klass: Laptop, qty: [0, 1] },
    ])
  }
}

registerClass(Desk)
