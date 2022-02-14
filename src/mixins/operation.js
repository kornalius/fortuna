import { operationTimeout } from '@/utils';

export default {
  state: {
    operation: null,
  },

  get isBusy() { return this.state.operation !== null },
  get operation() { return this.state.operation },
  set operation(value) { this.state.operation = value },

  async operate(name, cb, baseDelay) {
    const time = operationTimeout(baseDelay)

    this.operation = {
      name,
      pos: 0,
      total: 100,
    }

    let t = Math.floor(time * 0.1)
    const promises = []
    for (let i = 0; i < 10; i++) {
      promises.push(new Promise(resolve => {
        setTimeout(async () => {
          if (this.operation) {
            this.operation.pos += 10
            await this.onOperation(this.operation)
          }
          resolve()
        }, t * i)
      }))
    }

    await Promise.all(promises)

    this.operation = null

    return cb.call(this)
  },

  onOperation(operation) { }
}
