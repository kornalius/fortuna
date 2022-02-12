import { reactive } from 'vue'
import { v4 } from 'uuid'
import { store } from '@/store'
import { mixState } from '@/utils'

export default class Entity {
  constructor(data) {
    const newData = this.setupInstance(data)

    // take all functions from newData and add them to this
    Object.keys(newData).forEach(k => {
      const d = Object.getOwnPropertyDescriptor(newData, k)
      const td = Object.getOwnPropertyDescriptor(this, k)
      if (!td && typeof d.value === 'function') {
        this[k] = d.value
        delete newData[k]
      }
    })

    this.state = reactive(
      mixState(
        {
          ...this.state,
          id: v4(),
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

  mounted() {
  }
}
