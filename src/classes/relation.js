import Entity from '../entity';
import { store } from '../store';

export default class Relation extends Entity {
  setupInstance(data) {
    return {
      npcId: undefined,
      lvl: 0,
      ...data,
    }
  }

  get lvl() { return this.state.lvl }
  set lvl(value) { this.state.lvl = value }

  get isLoving() { return this.lvl >= 10 }
  get isFriendly() { return this.lvl >= 5 }
  get isNeutral() { return this.lvl < 5 && this.lvl > -5 }
  get isHateful() { return this.lvl <= -5 }
  get isAggressive() { return this.lvl <= -10 }

  get npcId() { return this.state.npcId }
  set npcId(value) { this.state.npcId = value }

  get npc() { return store.npcs.get(this.state.npcId) }
}
