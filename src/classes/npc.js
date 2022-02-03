import Entity from '../entity';
import { store } from '../store';
import clamp from 'lodash/clamp';

export default class Npc extends Entity {
  setupInstance(data) {
    return {
      name: 'Npc',
      hp: this.baseHp,
      lvl: 1,
      ...data,
    }
  }

  get name() { return this.state.name }

  get hp() { return this.state.hp }
  set hp(value) { this.state.hp = clamp(value, 0, this.maxHp) }
  get baseHp() { return store.config.baseHp }
  get highestHp() { return store.config.highestHp }
  get maxHp() {
    return Math.floor(this.baseHp + (this.highestHp - this.baseHp) * this.lvl / this.highestLvl)
  }

  get lvl() { return this.state.lvl }
  set lvl(value) { this.state.lvl = clamp(value, 1, this.highestLvl) }
  get highestLvl() { return store.config.highestLvl }

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
