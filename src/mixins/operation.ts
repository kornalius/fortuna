import { operationTimeout } from '@/utils'
import { State } from '@/entity'

/**
 * Execute an asynchronous operation on an object
 */

export interface IOperationItem {
  name: string
  pos: number
  total: number
}

export interface IOperationSetupData {
  // current running operation
  operation?: IOperationItem | null
  onOperation?: (operation: IOperationItem) => Promise<void>
}

export interface IOperation {
  state: State
  get isBusy(): boolean
  get operation(): IOperationItem | null
  set operation(value)
  operate(name: string, cb: () => Promise<boolean>, baseDelay?: number): Promise<boolean>
  onOperation(operation: IOperationItem): Promise<void>
}

export const Operation: IOperation = {
  state: {
    operation: null,
  } as IOperationSetupData,

  get isBusy(): boolean { return this.state.operation !== null },
  get operation(): IOperationItem | null { return this.state.operation },
  set operation(value) { this.state.operation = value },

  /**
   * Executes an asynchronous operation on object
   *
   * @param name {string} name of operation
   * @param cb {function} function to call onced done
   * @param baseDelay {number} execute time
   * @returns {Promise<*>} returns the result of call cb
   */
  async operate(name: string, cb: () => Promise<boolean>, baseDelay?: number): Promise<boolean> {
    const time = operationTimeout(baseDelay)

    this.operation = {
      name,
      pos: 0,
      total: 100,
    } as IOperationItem

    let t = Math.floor(time * 0.1)
    const promises = []
    for (let i = 0; i < 10; i++) {
      promises.push(new Promise((resolve: (value?: unknown) => void) => {
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

  /**
   * Called every 10% during an operation
   *
   * @param operation {object}
   * @returns {Promise<void>}
   */
  async onOperation(operation: IOperationItem): Promise<void> {},
}
