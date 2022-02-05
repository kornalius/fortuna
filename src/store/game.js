import { reactive } from 'vue'
import { Howl } from 'howler'
import { store } from '@/store'

export default class Game {
  storeName = 'game'

  state = reactive({
    started: false,
    paused: false,
    sounds: {},
  })

  constructor() {
    this.state.sounds = this.loadSound([
      { 'test-music': 'music/test-music.mp3' },
      { 'test-sound': 'sfx/test-sound.wav' },
    ]);
  }

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
}
