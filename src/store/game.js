import { reactive } from 'vue'
import { store } from '@/store'

export default class Game {
  storeName = 'game'

  state = reactive({
    started: false,
    paused: false,
  })

  get isStarted() { return this.state.started }
  get isPaused() { return this.state.paused }

  start() {
    this.state.started = true
    store.player.room = store.rooms.at(0, 0)
  }

  pause() {
    this.state.paused = true
  }

  resume() {
    this.state.paused = false
  }
}
