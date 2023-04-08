/**
 * Makes an object pickable
 */

import { can, emit, log, LOG_ERROR, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from './name'
import { IIcon } from './icon'
import { IRequirements } from './requirements'
import { ILocation } from './location'
import { IHovered } from './hovered'
import { Npc } from '@/classes/npcs/npc'

export interface IPickable extends IName, IIcon, IRequirements, IHovered, ILocation {
  state: State
  get isPickable(): boolean
  set pickable(value: boolean)
  get pickupLabel(): string
  canPickup(showMessage?: boolean): boolean
  pickup(): Promise<boolean>
  onPickup(): Promise<void>
}

// @ts-ignore
export const Pickable: IPickable = {
  state: {
    // is the object pickable
    pickable: true,
    actions: [
      (item: IPickable) => (
        item.isPickable && !window.store.player.has(item)
          ? {
            label: item.pickupLabel,
            key: 'pickup',
            icon: 'pickup',
            disabled: !item.canPickup(),
            click: async () => item.pickup(),
          }
          : undefined
      ),
    ],
  },

  get isPickable(): boolean { return this.state.pickable },
  set pickable(value: boolean) { this.state.pickable = value },

  /**
   * Returns the pickup label with its requirements
   *
   * @returns {string}
   */
  get pickupLabel(): string { return `Pickup ${this.requirementsLabelFor('pickup')}` },

  canPickup(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isPickable,
        log: () => `${this.nameProper} cannot be picked`
      },
      {
        expr: () => window.store.player.has(this),
        log: () => `${this.nameProper} is already in your inventory`
      },
    ], showMessage, 'pickup')
  },

  /**
   * Pickup the item to the player's inventory
   *
   * @returns {Promise<boolean>}
   */
  async pickup(): Promise<boolean> {
    if (!this.canPickup(true)) {
      return false
    }

    // check if there are owners of this room/building present seeing you commit the crime of stealing!!!
    const presentOwners: Npc[] = this.location?.presentOwners
    if (presentOwners?.length > 0) {
      log(`You have been caugth stealing by ${presentOwners.map(o => o.nameProper).join(', ')}`, LOG_ERROR, this.icon)
      presentOwners.forEach(o => { o.aggresive = true })
    }

    window.store.player.addItem(this)

    // mark item in your inventory as new
    this.hovered = false

    log(`You pickup ${this.nameDisplay}`, LOG_WARN, this.icon)
    await emit(this, 'onPickup')
    return true
  },

  async onPickup(): Promise<void> {
    window.store.game.playSound('pickup')
  },
}
