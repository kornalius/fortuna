import { reactive } from 'vue'
import { v4 } from 'uuid'
import { store } from '@/store'

class Entity {
  constructor(data) {
    this.state = reactive({
      ...this.state,
      id: v4(),
      store: undefined,
      ...this.setupInstance(data)
    })
  }

  setupInstance(data) {
    return data
  }

  get id() { return this.state.id }
  get store() { return this.state.store }

  remove() {
    store[this.store].remove(this.id)
  }
}

export default Entity
