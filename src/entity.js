import { reactive } from 'vue'
import { v4 } from 'uuid'
import { store } from '@/store'
import { mixState } from '@/utils'

export default class Entity {
  constructor(data) {
    this.state = reactive(
      mixState(
        {
          ...this.state,
          id: v4(),
          store: undefined,
        },
        this.setupInstance(data)
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
