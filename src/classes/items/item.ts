import { Entity, SetupData } from '@/entity'
import { mixin, registerClass } from '@/utils'
import { ICode, Code } from '@/mixins/code'
import { IName, Name } from '@/mixins/name'
import { IDescription, Description } from '@/mixins/description'
import { IIcon, Icon } from '@/mixins/icon'
import { IWeight, Weight } from '@/mixins/weight'
import { IBuffs, Buffs } from '@/mixins/buffs'
import { IQty, Qty } from '@/mixins/qty'
import { IOperation, Operation } from '@/mixins/operation'
import { IHovered, Hovered } from '@/mixins/hovered'
import { ILocation, Location } from '@/mixins/location'
import { IActions, Actions } from '@/mixins/actions'
import { IPickable, Pickable } from '@/mixins/pickable'
import { IDropable, Dropable } from '@/mixins/dropable'
import { IUsable, Usable } from '@/mixins/usable'
import { IActivable, Activable } from '@/mixins/activable'
import { IConsumable, Consumable } from '@/mixins/consumable'
import { IDestructable, Destructable } from '@/mixins/destructable'
import { IExaminable, Examinable } from '@/mixins/examinable'
import { IPushable, Pushable } from '@/mixins/pushable'
import { IPullable, Pullable } from '@/mixins/pullable'
import { IRequirements, Requirements } from '@/mixins/requirements'
import { ITooltip, Tooltip } from '@/mixins/tooltip'

export interface Item extends
  ICode,
  IName,
  IDescription,
  IIcon,
  IQty,
  IWeight,
  IBuffs,
  IOperation,
  IHovered,
  ILocation,
  IActions,
  IPickable,
  IDropable,
  IUsable,
  IActivable,
  IConsumable,
  IDestructable,
  IExaminable,
  IPushable,
  IPullable,
  IRequirements,
  ITooltip
{}

export class Item extends Entity {
  setupInstance(data?: SetupData): SetupData | undefined {
    const { locationId, locationStore } = this.setupLocation(data)

    return {
      name: 'Item',
      locationId,
      locationStore,
      ...(data || {})
    }
  }

  get isInInventory(): boolean { return window.store.player.has(this) }
}

mixin(Item, [
  Code,
  Name,
  Description,
  Icon,
  Qty,
  Weight,
  Buffs,
  Operation,
  Hovered,
  Location,
  Actions,
  Pickable,
  Dropable,
  Usable,
  Activable,
  Consumable,
  Destructable,
  Examinable,
  Pushable,
  Pullable,
  Requirements,
  Tooltip,
])

registerClass(Item)
