import { reactive } from 'vue'
import { store } from '@/store'
import { mixState, deserializeObject } from '@/utils'

export default class Entity {
  constructor(data) {
    const newData = this.setupInstance(data)

    // take all functions from newData and add them to this
    Object.keys(newData).forEach(k => {
      const d = Object.getOwnPropertyDescriptor(newData, k)
      const td = Object.getOwnPropertyDescriptor(this, k)
      if (!td && typeof d.value === 'function') {
        this[k] = function () {
          if (typeof this.constructor.prototype[k] === 'function') {
            this.constructor.prototype[k].call(this)
          }
          return d.value.call(this)
        }.bind(this)
        delete newData[k]
      }
    })

    this.state = reactive(
      mixState(
        {
          ...this.state,
          id: nanoid(),
          store: null,
        },
        newData
      )
    )
  }

  setupInstance(data) {
    return data
  }

  get id() { return this.state.id }
  get store() { return this.state.store }

  remove() {
    store[this.store].remove(this.id)
  }

  deserialize() {
    return deserializeObject(this.state)
  }

  mounted() {
  }
}
