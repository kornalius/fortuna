import Entity from '../entity'
import { mixin } from '@/utils'
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Items from '@/mixins/items'

export default class Npc extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Npc',
      hp: this.maxHp,
      ...data,
    })
  }

  get name() { return this.state.name }

  get maxWeight() { return 10 * Math.pow(this.lvl, 2)  }
  get carryWeight() { return this.items.reduce((acc, item) => acc + item.weight, 0) }

  get canMove() { return this.carryWeight <= this.maxWeight }
}

mixin(Npc, [Items, Level, Buffable, Hp])
