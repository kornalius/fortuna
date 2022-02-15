import { reactive } from 'vue'
import { Howl } from 'howler'
import max from 'lodash/max'
import { store } from '@/store'
import { soundFiles } from '@/sounds'

export default class Game {
  storeName = 'game'

  state = reactive({
    started: false,
    paused: false,
    roomId: null,
    sounds: {},
  })

  get room() {
    return this.state.roomId
      ? store.rooms.get(this.state.roomId)
      : undefined
  }
  set room(value) {
    if (value) {
      this.state.roomId = value.id
    } else {
      this.state.roomId = null
    }
  }

  get isStarted() { return this.state.started }
  get isPaused() { return this.state.paused }

  get width() { return max(store.rooms.list.map(r => r.x )) }
  get height() { return max(store.rooms.list.map(r => r.y )) }

  get minimapWidth() { return (this.width || 1) * store.config.minimapRoomSize }
  get minimapHeight() { return (this.height || 1) * store.config.minimapRoomSize }

  async start() {
    if (this.state.paused) {
      window.location.reload()
      return
    }
    this.state.started = true
    const room = store.rooms.at(0, 0)
    if (room) {
      await room.enter()
    }
  }

  pause() {
    this.state.paused = true
  }

  resume() {
    this.state.paused = false
  }

  loadSound(name) {
    if (typeof soundFiles[name] !== 'string') {
      return new Howl({
        ...soundFiles[name],
        src:  [`/sounds/${soundFiles[name].src}`],
      })
    } else {
      return new Howl({ src: [`/sounds/${soundFiles[name]}`] })
    }
  }

  playSound(name, volume) {
    if (!this.state.sounds[name]) {
      this.state.sounds[name] = this.loadSound(name)
      this.state.sounds[name].once('load', () => this.state.sounds[name].play())
    }
    if (volume) {
      this.state.sounds[name].volume(volume)
    }
    this.state.sounds[name].play()
  }

  pauseSound(name) {
    this.state.sounds[name].pause()
  }

  stopSound(name) {
    this.state.sounds[name].stop()
  }

  isSoundPlaying(name) {
    return this.state.sounds[name].playing()
  }

  toggleSound(name) {
    if (this.isSoundPlaying(name)) {
      this.playSound(name)
    } else {
      this.stopSound(name)
    }
  }
}
