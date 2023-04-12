import { reactive } from 'vue'
import { mixState, deserializeObject, AnyData } from '@/utils'

export type SetupData = AnyData
export type State = AnyData

export interface IEntityData extends AnyData{
  mounted?: () => void
}

export interface Entity {
  state: State
}

export class Entity {
  constructor(data?: IEntityData) {
    const newData = this.setupInstance(data) || {}

    // take all functions from newData and add them to this
    Object.keys(newData).forEach(k => {
      const d = Object.getOwnPropertyDescriptor(newData, k)
      const td = Object.getOwnPropertyDescriptor(this, k)
      if (!td && d && typeof d.value === 'function') {
        // @ts-ignore
        this[k] = function () {
          // @ts-ignore
          if (typeof this.constructor.prototype[k] === 'function') {
            // @ts-ignore
            this.constructor.prototype[k].call(this)
          }
          // @ts-ignore
          return d.value.call(this)
        }.bind(this)
        delete newData[k]
      }
    })

    this.state = reactive(
      mixState(
        {
          ...this.state,
          id: window.nanoid(),
          store: null,
        },
        newData
      )
    )
  }

  setupInstance(data?: IEntityData): SetupData | undefined {
    return data
  }

  get id(): string { return this.state.id }
  get store() { return this.state.store }

  remove(): void {
    (window.store as AnyData)[this.store].remove(this.id)
  }

  deserialize(): any {
    return deserializeObject(this.state)
  }

  mounted(): void {
  }
}
