import random from 'lodash/random'
import anime from 'animejs'
import Entity from '../entity'
import { store } from '@/store'
import { emit, log } from '@/utils'

export default class Combat extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      npcId: null,
      // current turn
      turn: 1,
      // rolls left for the turn
      rolls: store.player.maxRolls,
      // has the combat ended
      ended: false,
      // did you win the battle?
      won: false,
      // selected dice
      selected: [],
      ...data,
    })
  }

  get npcId() { return this.state.npcId }
  set npcId(value) { this.state.npcId = value }

  get npc() {
    return this.state.npcId
      ? store.npcs.get(this.state.npcId)
      : undefined
  }
  set npc(value) {
    if (value) {
      this.state.npcId = value.id
    } else {
      this.state.npcId = null
    }
  }

  get turn() { return this.state.turn }
  set turn(value) { this.state.turn = value }

  get rolls() { return this.state.rolls }
  set rolls(value) { this.state.rolls = value }

  get ended() { return this.state.ended }
  set ended(value) { this.state.ended = value }

  get won() { return this.state.won }
  set won(value) { this.state.won = value }

  get selected() { return this.state.selected }
  set selected(value) { this.state.selected = value }

  get hasSelected() { return this.selected.length > 0 }

  async nextTurn() {
    log('Next turn started')

    this.turn += 1
    await emit.call(this, 'onTurn', this.turn)

    store.player.shields = 0
    store.player.rolls = store.player.maxRolls

    await this.roll([])
  }

  async onTurn(turn) {}

  canReroll(showMessage) {
    if (!this.hasSelected) {
      if (showMessage) {
        log('You need to select dice to reroll first')
      }
      return false
    }
    if (store.player.rolls <= 0) {
      if (showMessage) {
        log('You cannot reroll anymore')
      }
      return false
    }
    return true
  }

  /**
   * Reroll selected dice
   * @returns {Promise<void>}
   */
  async reroll() {
    if (!this.canReroll(true)) {
      return false
    }
    return this.roll(this.selected)
  }

  async roll(indexes) {
    store.player.rolls -= 1

    if (indexes.length === 0) {
      for (let i = 0; i < store.player.dice.length; i++) {
        indexes.push(i)
      }
    }

    this.selected = []

    await Promise.all(indexes.map(i => new Promise(async resolve => {
      const die = store.player.dice[i]
      const count = random(5, 10)
      for (let c = 0; c < count; c++) {
        await new Promise(resolve => {
          setTimeout(() => {
            die.value = random(1, 6)
            resolve()
          }, 100)
        })
      }
      resolve()
    })))

    return true
  }

  canStartCombat(showMessage) {
    return true
  }

  async startCombat() {
    if (!this.canStartCombat(true)) {
      return false
    }

    this.turn = 1
    store.player.shields = 0
    store.player.rolls = store.player.maxRolls

    await emit.call(this, 'onStartCombat')

    await this.roll([])

    return true
  }

  async onStartCombat() {}

  canEndCombat(showMessage) {
    return this.npc.hp <= 0 || store.player.hp <= 0
  }

  async endCombat() {
    if (!this.canEndCombat(true)) {
      return false
    }

    this.ended = true
    store.player.combat = null
    await emit.call(this, 'onEndCombat')

    this.won = false

    if (store.player.hp > 0) {
      this.won = true
      log('You have won the battle')
      await emit.call(this, 'onWin')
      return true
    }

    log('You have lost the battle')
    await emit.call(this, 'onLose')
    return true
  }

  async onEndCombat() {}

  async onWin() {}

  async onLose() {}

  isSelected(index) {
    return this.selected.includes(index)
  }

  canSelect(index, showMessage) {
    if (store.player.rolls <= 0) {
      if (showMessage) {
        log('You have no rerolls left')
      }
      return false
    }
    if (this.isSelected(index)) {
      if (showMessage) {
        log('This die is already selected')
      }
      return false
    }
    return true
  }

  async select(index) {
    if (!this.canSelect(index, true)) {
      return false
    }
    this.selected.push(index)
    await emit.call(this, 'onSelect', index)
    return true
  }

  async onSelect(index) {}

  canUnselect(index, showMessage) {
    if (!this.isSelected(index)) {
      if (showMessage) {
        log('This die is not selected')
      }
      return false
    }
    return true
  }

  async unselect(index) {
    if (!this.canUnselect(index, true)) {
      return false
    }
    const i = this.selected.indexOf(index)
    this.selected.splice(i, 1)
    await emit.call(this, 'onUnselect', index)
    return true
  }

  async onUnselect(index) {}

  async toggleSelect(index) {
    if (this.isSelected(index)) {
      return this.unselect(index)
    }
    return this.select(index)
  }

  canEndTurn(showMessage) {
    return true
  }

  /**
   * Execute dice actions
   *
   * @returns {Promise<boolean|void>}
   */
  async endTurn() {
    if (!this.canEndTurn(true)) {
      return false
    }

    const attacks = []
    const defends = []
    const lifes = []
    const bombs = []
    const busts = []

    for (let i = 0; i < store.player.dice.length; i++) {
      const die = store.player.dice[i]

      switch (store.config.battleDice[die.value - 1].value) {
        case 'A': // sword
          attacks.push(i)
          break
        case 'D': // shield
          defends.push(i)
          break
        case 'H': // heart
          lifes.push(i)
          break
        case 'B': // bomb
          bombs.push(i)
          break
        case 'X': // shield buster
          busts.push(i)
          break
        default:
      }
    }

    if (defends.length) {
      await this.defend(defends)
    }
    if (busts.length) {
      await this.bustShield(busts)
    }
    if (attacks.length) {
      await this.attack(attacks)
    }
    if (bombs.length) {
      await this.damage(bombs)
    }
    if (this.npc.swordDice.length) {
      await this.npcAttack(this.npc.swordDiceIndexes)
    }
    if (lifes.length) {
      await this.gainLife(lifes)
    }

    // this will check first if it needs to end the combat
    if (!(await this.endCombat())) {
      await this.nextTurn()
    }

    return true
  }

  async highlightDice(name, dice) {
    return anime.timeline({
      duration: 1000,
      targets: dice.map(i => `.${name}-die-${i}`),
    })
      .add({ scale: 1.25 })
      .add({ scale: 1 }, 500)
      .finished
  }

  async showDamage(name, dmg) {
    const hitLabelEl = document.querySelector(`.${name}-hit-label`)
    hitLabelEl.textContent = dmg.toString()

    anime.set(`.${name}-hit`, {
      scale: 0,
      opacity: 0,
    })

    return anime.timeline({
      targets: `.${name}-hit`,
      easing: 'spring(1, 80, 10, 20)'
    })
      .add({
        scale: 1,
        opacity: 1,
      })
      .add({
        scale: 0,
        opacity: 0,
      })
      .finished
  }

  /**
   * Apply attack dice to opponent
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async attack(dice) {
    const dmg = dice.length - this.npc.shieldDice.length
    await this.highlightDice('player', dice)
    if (dmg > 0) {
      log(`${store.player.name} attack for ${dmg} damage`)
      await this.showDamage('npc', dmg)
      this.npc.hp -= dmg
      await emit.call(this, 'onAttack', dmg)
    }
  }

  async onAttack(dmg) {}

  /**
   * Apply defend dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async defend(dice) {
    const shields = dice.length
    await this.highlightDice('player', dice)
    if (shields > 0) {
      const o = store.player.shields
      store.player.shields += shields
      const v = store.player.shields - o
      if (v > 0) {
        log(`${store.player.name} gains ${v} shield(s)`)
        await emit.call(this, 'onDefend', dice, v)
      }
    }
  }

  async onDefend(shields) {}

  /**
   * Apply heart dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async gainLife(dice) {
    const hearts = dice.length
    await this.highlightDice('player', dice)
    if (hearts > 0) {
      const o = store.player.hp
      store.player.hp += dice.length
      const v = store.player.hp - o
      if (v > 0) {
        log(`${store.player.name} gains ${v} life`)
        await emit.call(this, 'onGainLife', v)
      }
    }
  }

  async onGainLife(hearts) {}

  /**
   * Apply bomb dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async damage(dice) {
    const dmg = dice.length - store.player.shields
    store.player.shields -= dice.length
    await this.highlightDice('player', dice)
    if (dmg > 0) {
      log(`${store.player.name} receive ${dmg} damage(s)`)
      await this.showDamage('player', dmg)
      store.player.hp -= dmg
      await emit.call(this, 'onDamage', dice, dmg)
    }
  }

  async onDamage(dice, dmg) {}

  /**
   * Apply npc attack dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async npcAttack(dice) {
    const dmg = dice.length - store.player.shields
    store.player.shields -= dice.length
    await this.highlightDice('npc', dice)
    if (dmg > 0) {
      log(`${this.npc.name} hits for ${dmg} damage(s)`)
      await this.showDamage('player', dmg)
      store.player.hp -= dmg
      await emit.call(this, 'onNpcAttack', dmg)
    }
  }

  async onNpcAttack(dmg) {}

  /**
   * Apply shield buster dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async bustShield(dice) {
    const shields = dice.length
    await this.highlightDice('player', dice)
    if (shields > 0) {
      const npcShields = this.npc.shieldDice.length;
      const v = npcShields - shields < 0
        ? npcShields
        : npcShields - shields
      if (v > 0) {
        log(`${store.player.name} bust ${v} shield(s)`)
        for (let c = 0; c < v; c++) {
          const i = this.npc.shieldDiceIndexes[0]
          this.npc.dice.splice(i, 1)
        }
        await emit.call(this, 'onBustShield', v)
      }
    }
  }

  async onBustShield(dmg) {}
}
