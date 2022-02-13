import { reactive } from 'vue'
import { Howl } from 'howler'
import max from 'lodash/max'
import { store } from '@/store'
import { emit } from '@/utils'

const soundFiles = {
  'test-music': 'music/test-music.mp3',

  'test-sound': 'sfx/test-sound.wav',
  'boot-sound': 'sfx/boot-sound.wav',
  'keyboard': 'sfx/keyboard.wav',
  'switch': 'sfx/switch.wav',
  'button': { src: 'sfx/button.wav', volume: 0.5 },
  'print': 'sfx/print.wav',
  'unlock': 'sfx/unlock.wav',
  'open-door': 'sfx/open-door.wav',
  'close-door': 'sfx/close-door.wav',
  'open-drawer': 'sfx/open-drawer.wav',
  'close-drawer': 'sfx/close-drawer.wav',
  'walk': 'sfx/walk.wav',
  'pickup': 'sfx/pickup.wav',
  'click': 'sfx/click.wav',
}

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

  async levelUp() {
    store.player.lvl += 1
    await emit('onLevelUp')
  }

  onLevelUp() {
  }
}
