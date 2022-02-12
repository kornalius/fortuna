import { operationTimeout } from '@/utils';

export default {
  state: {
    operation: null,
  },

  get isBusy() { return this.state.operation !== null },
  get operation() { return this.state.operation },
  set operation(value) { this.state.operation = value },

  async operate(name, cb, baseDelay) {
    return new Promise(resolve => {
      const time = operationTimeout(baseDelay)

      this.operation = {
        name,
        pos: 0,
        total: 100,
        interval: setInterval(() => {
          this.operation.pos += 10
          this.onOperation(this.operation)
        }, Math.floor(time * 0.1)),
      }

      setTimeout(async () => {
        clearInterval(this.operation.interval)
        this.operation = null
        cb.call(this)
        resolve(true)
      }, time)
    })
  },

  onOperation(operation) { }
}
