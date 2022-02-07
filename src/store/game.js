import { reactive } from 'vue'
import { Howl } from 'howler'
import max from 'lodash/max'
import { store } from '@/store'

export default class Game {
  storeName = 'game'

  state = reactive({
    started: false,
    paused: false,
    roomId: undefined,
    sounds: {},
  })

  constructor() {
    this.state.sounds = this.loadSound([
      { 'test-music': 'music/test-music.mp3' },
      { 'test-sound': 'sfx/test-sound.wav' },
    ]);
  }

  get room() {
    return this.state.roomId
      ? store.rooms.get(this.state.roomId)
      : undefined
  }
  set room(value) {
    if (value) {
      this.state.roomId = value.id
    } else {
      this.state.roomId = undefined
    }
  }

  get isStarted() { return this.state.started }
  get isPaused() { return this.state.paused }

  get minimapRoomSize() { return 32 }

  get width() { return max(store.rooms.map(r => r.x )) }
  get height() { return max(store.rooms.map(r => r.y )) }

  get minimapWidth() { return this.width * this.minimapRoomSize }
  get minimapHeight() { return this.height * this.minimapRoomSize }

  start() {
    this.state.started = true
    store.rooms.at(0, 0).enter()
  }

  pause() {
    this.state.paused = true
  }

  resume() {
    this.state.paused = false
  }

  loadSound(sound) {
    if (Array.isArray(sound)) {
      return sound.reduce((acc, s) => ({ ...acc, ...this.loadSound(s) }), {})
    }

    const name = Object.keys(sound)[0]

    return {
      [name]: new Howl({
        src: [`/sounds/${sound[name]}`],
      })
    }
  }

  playSound(name) {
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

  exec(action) {
    // call action function
    if (action.fn) {
      action.fn()
    }

    // game onAction
    this.onAction(action)

    // room onAction
    if (action.location) {
      action.location.onAction(action)
    }
  }

  onAction(action) {
  }
}
