import { Entity, SetupData } from '@/entity'
import { mixin, registerClass } from '@/utils'
import { ICode, ICodeSetupData, Code } from '@/mixins/code'
import { IName, INameSetupData, Name } from '@/mixins/name'
import { IDescription, IDescriptionSetupData, Description } from '@/mixins/description'
import { IIcon, IIconSetupData, Icon } from '@/mixins/icon'
import { IWeight, IWeightSetupData, Weight } from '@/mixins/weight'
import { IBuffs, IBuffsSetupData, Buffs } from '@/mixins/buffs'
import { IQty, IQtySetupData, Qty } from '@/mixins/qty'
import { IOperation, IOperationSetupData, Operation } from '@/mixins/operation'
import { IHovered, IHoveredSetupData, Hovered } from '@/mixins/hovered'
import { ILocation, ILocationSetupData, Location } from '@/mixins/location'
import { IActions, IActionsSetupData, Actions } from '@/mixins/actions'
import { IPickable, IPickableSetupData, Pickable } from '@/mixins/pickable'
import { IDropable, IDropableSetupData, Dropable } from '@/mixins/dropable'
import { IUsable, IUsableSetupData, Usable } from '@/mixins/usable'
import { IActivable, IActivableSetupData, Activable } from '@/mixins/activable'
import { IConsumable, IConsumableSetupData, Consumable } from '@/mixins/consumable'
import { IDestructable, IDestructableSetupData, Destructable } from '@/mixins/destructable'
import { IExaminable, IExaminableSetupData, Examinable } from '@/mixins/examinable'
import { IPushable, IPushableSetupData, Pushable } from '@/mixins/pushable'
import { IPullable, IPullableSetupData, Pullable } from '@/mixins/pullable'
import { IRequirements, IRequirementsSetupData, Requirements } from '@/mixins/requirements'
import { ITooltip, ITooltipSetupData, Tooltip } from '@/mixins/tooltip'
import { ISelectable, ISelectableSetupData, Selectable } from '@/mixins/selectable'

export interface IItemSetupData extends
  ICodeSetupData,
  INameSetupData,
  IDescriptionSetupData,
  IIconSetupData,
  IQtySetupData,
  IWeightSetupData,
  IBuffsSetupData,
  IOperationSetupData,
  IHoveredSetupData,
  ILocationSetupData,
  IActionsSetupData,
  IPickableSetupData,
  IDropableSetupData,
  IUsableSetupData,
  IActivableSetupData,
  IConsumableSetupData,
  IDestructableSetupData,
  IExaminableSetupData,
  IPushableSetupData,
  IPullableSetupData,
  IRequirementsSetupData,
  ITooltipSetupData,
  ISelectableSetupData
{}

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
  ITooltip,
  ISelectable
{}

export class Item extends Entity {
  constructor(data?: IItemSetupData) {
    super(data)
  }

  setupInstance(data?: IItemSetupData): SetupData | undefined {
    const { locationId, locationStore } = this.setupLocation(data as SetupData)

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
  Selectable,
])

registerClass(Item)
