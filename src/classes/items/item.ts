import { Entity, IEntityData, SetupData } from '@/entity'
import { mixin, registerClass } from '@/utils'
import { ICode, ICodeData, Code } from '@/mixins/code'
import { IName, INameData, Name } from '@/mixins/name'
import { IDescription, IDescriptionData, Description } from '@/mixins/description'
import { IIcon, IIconData, Icon } from '@/mixins/icon'
import { IWeight, IWeightData, Weight } from '@/mixins/weight'
import { IBuffs, IBuffsData, Buffs } from '@/mixins/buffs'
import { IQty, IQtyData, Qty } from '@/mixins/qty'
import { IOperation, IOperationData, Operation } from '@/mixins/operation'
import { IHovered, IHoveredData, Hovered } from '@/mixins/hovered'
import { ILocation, ILocationData, Location } from '@/mixins/location'
import { IActions, IActionsData, Actions } from '@/mixins/actions'
import { IPickable, IPickableData, Pickable } from '@/mixins/pickable'
import { IDropable, IDropableData, Dropable } from '@/mixins/dropable'
import { IUsable, IUsableData, Usable } from '@/mixins/usable'
import { IActivable, IActivableData, Activable } from '@/mixins/activable'
import { IConsumable, IConsumableData, Consumable } from '@/mixins/consumable'
import { IDestructable, IDestructableData, Destructable } from '@/mixins/destructable'
import { IExaminable, IExaminableData, Examinable } from '@/mixins/examinable'
import { IPushable, IPushableData, Pushable } from '@/mixins/pushable'
import { IPullable, IPullableData, Pullable } from '@/mixins/pullable'
import { IRequirements, IRequirementsData, Requirements } from '@/mixins/requirements'
import { ITooltip, ITooltipData, Tooltip } from '@/mixins/tooltip'
import { ISelectable, ISelectableData, Selectable } from '@/mixins/selectable'

export interface IItemData extends
  IEntityData,
  ICodeData,
  INameData,
  IDescriptionData,
  IIconData,
  IQtyData,
  IWeightData,
  IBuffsData,
  IOperationData,
  IHoveredData,
  ILocationData,
  IActionsData,
  IPickableData,
  IDropableData,
  IUsableData,
  IActivableData,
  IConsumableData,
  IDestructableData,
  IExaminableData,
  IPushableData,
  IPullableData,
  IRequirementsData,
  ITooltipData,
  ISelectableData
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
  constructor(data?: IItemData) {
    super(data)
  }

  setupInstance(data?: IItemData): SetupData | undefined {
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
