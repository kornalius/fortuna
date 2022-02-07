import Entity from '../entity'
import { mixin } from '@/utils'
import { store } from '@/store'
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Items from '@/mixins/items'
import Carry from '@/mixins/carry'

export default class Npc extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Npc',
      hp: this.maxHp,
      ...data,
    })
  }

  get name() { return this.state.name }

  get items() { return store.items.list.filter(i => i.location === this) }
}

mixin(Npc, [Items, Level, Buffable, Hp, Carry])
