import random from 'lodash/random'
import DomParticles from 'dom-particles'

export const domParticles = new DomParticles()

export const bleed = (x, y, emitterOptions = {}, particleOptions = {}) => {
  domParticles.addEmitter({
    maxEmissions: 10,
    ttl: 500,
    emitEvery: 25,
    position: { x, y, z: 2 },
    ...emitterOptions,
    particleOptions: {
      ttl: 600,
      content: '',
      style: {
        background: '#D12E2E',
        width: '15px',
        height: '15px',
        scale: [1, 0.25],
        'border-radius': '50%',
      },
      onCreate(particle) {
        particle.velocity.x = random(-75, 75)
        particle.velocity.y = -150
        particle.acceleration.y = 1000
      },
      ...particleOptions,
    }
  })
}

export const life = (x, y, emitterOptions = {}, particleOptions = {}) => {
  domParticles.addEmitter({
    maxEmissions: 10,
    ttl: 500,
    emitEvery: 25,
    position: { x, y, z: 2 },
    ...emitterOptions,
    particleOptions: {
      ttl: 500,
      contents: '❤',
      style: {
        color: '#D12E2E',
        'font-size': '16px',
        scale: [1, 2],
      },
      onCreate(particle) {
        particle.velocity.x = random(-150, 150)
        particle.velocity.y = random(-250, 250)
      },
      ...particleOptions,
    }
  })
}

export const addEmitter = (x, y, emitterOptions = {}, particleOptions = {}) => {
  domParticles.addEmitter({
    maxEmissions: 10,
    ttl: 500,
    emitEvery: 25,
    position: { x, y, z: 2 },
    ...emitterOptions,
    particleOptions,
  })
}
