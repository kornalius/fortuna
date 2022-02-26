import { reactive } from 'vue'
import { Howl } from 'howler'
import max from 'lodash/max'
import { reset, store } from '@/store'
import { soundFiles } from '@/sounds'

export default class Game {
  storeName = 'game'

  constructor() {
    this.state = reactive({ ...this.defaultState })
  }

  get defaultState() {
    return {
      started: false,
      paused: false,
      cityId: null,
      buildingId: null,
      roomId: null,
      sounds: {},
      showOptions: false,
      volume: 0.1,
    }
  }

  get hasSave() { return typeof localStorage.getItem('game') === 'string' }

  get roomId() { return this.state.roomId }
  set roomId(value) { this.state.roomId = value }

  get room() {
    return this.roomId
      ? store.rooms.get(this.roomId)
      : undefined
  }
  set room(value) {
    if (value) {
      this.roomId = value.id
    } else {
      this.roomId = null
    }
  }

  get cityId() { return this.state.cityId }
  set cityId(value) { this.state.cityId = value }

  get city() {
    return this.cityId
      ? store.cities.get(this.cityId)
      : undefined
  }
  set city(value) {
    if (value) {
      this.cityId = value.id
    } else {
      this.cityId = null
    }
  }

  get buildingId() { return this.state.buildingId }
  set buildingId(value) { this.state.buildingId = value }

  get building() {
    return this.buildingId
      ? store.buildings.get(this.buildingId)
      : undefined
  }
  set building(value) {
    if (value) {
      this.buildingId = value.id
    } else {
      this.buildingId = null
    }
  }

  get isStarted() { return this.state.started }
  get isPaused() { return this.state.paused }

  get width() { return max(store.rooms.list.map(r => r.x )) }
  get height() { return max(store.rooms.list.map(r => r.y )) }

  get minimapWidth() { return (this.width || 1) * store.config.minimapRoomSize }
  get minimapHeight() { return (this.height || 1) * store.config.minimapRoomSize }

  get showOptions() { return this.state.showOptions }
  set showOptions(value) { this.state.showOptions = value }

  get volume() { return this.state.volume }
  set volume(value) { this.state.volume = Math.max(0.0, Math.min(1.0, value)) }

  async start() {
    if (this.state.paused) {
      window.location.reload()
      return
    }
    this.state.started = true
    if (!this.city) {
      const city = store.cities.findByName(store.config.startCityName)
      if (city) {
        await city.enter()
      }
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

  async load() {
    const data = JSON.parse(localStorage.getItem('game'))

    if (data) {
      this.serialize(data.game)
      store.player.serialize(data.player)
    }
  }

  async save() {
    const data = {
      game: this.unserialize(),
      player: store.player.unserialize(),
    }

    localStorage.setItem('game', JSON.stringify(data))
  }

  async delete() {
    localStorage.removeItem('game')
  }

  async reset() {
    Object.keys(this.defaultState).forEach(k => {
      if (k !== 'sounds') {
        this.state[k] = this.defaultState[k]
      }
    })
  }

  async restart() {
    await this.delete()
    await reset()
    await this.start()
  }

  unserialize() {
    return {
      cityId: this.cityId,
      buildingId: this.buildingId,
      roomId: this.roomId,
      volume: this.volume,
    }
  }

  serialize(data) {
    this.cityId = data.cityId
    this.buildingId = data.buildingId
    this.roomId = data.roomId
    this.volume = data.volume
  }
}
