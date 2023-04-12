import { IItemData, Item } from '../items/item'
import { can, LOG_WARN, registerClass } from '@/utils'
import { SetupData } from '@/entity'

export interface IBattleItemData extends IItemData {}

export class BattleItem extends Item {
  constructor(data?: IBattleItemData) {
    super(data)
  }

  setupInstance(data?: IBattleItemData): SetupData | undefined {
    return super.setupInstance({
      usable: true,
      uses: 1,
      ...(data || {})
    })
  }

  get isBattle(): boolean { return true }

  canUse(showMessage?: boolean): boolean {
    if (!can(this, [
      {
        expr: () => !window.store.player.isInCombat,
        log: () => `You must be in combat to use ${this.nameDisplay}`,
        level: LOG_WARN
      },
      {
        expr: () => !!window.store.player.combat?.processing,
        log: () => `You must wait for your turn to use ${this.nameDisplay}`,
        level: LOG_WARN
      },
    ], showMessage)) {
      return false
    }
    return super.canUse(showMessage)
  }
}

registerClass(BattleItem)
