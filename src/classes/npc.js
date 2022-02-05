import Entity from '../entity'
import { store } from '../store'
import { mixin } from '@/utils'
import Level from '@/mixins/level'
import Hp from '@/mixins/hp'

export default class Npc extends Entity {
  setupInstance(data) {
    return {
      name: 'Npc',
      hp: this.maxHp,
      ...data,
    }
  }

  get name() { return this.state.name }

  get relation() { return store.relations.find(r => r.npc === this) }

  get items() { return store.items.list.filter(i => i.location === this) }

  get maxWeight() { return 10 * Math.pow(this.lvl, 2)  }
  get carryWeight() { return this.items.reduce((acc, item) => acc + item.weight, 0) }

  get canMove() { return this.carryWeight <= this.maxWeight }

  incRelation(by = 1) {
    if (this.relation) {
      this.relation.lvl += by
    }
  }

  decRelation(by = 1) {
    if (this.relation) {
      this.relation.lvl -= by
    }
  }
}

mixin(Npc, Level)
mixin(Npc, Hp)
