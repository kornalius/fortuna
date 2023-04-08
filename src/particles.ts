import random from 'lodash/random'
// @ts-ignore
import DomParticles, { EmitterOptions, ParticleOptions, TextParticle } from 'dom-particles'

export const domParticles = new DomParticles()

export const bleed = (x: number, y: number, emitterOptions: EmitterOptions = {}, particleOptions: ParticleOptions = {}) => {
  domParticles.addEmitter({
    maxEmissions: 25,
    ttl: 500,
    emitEvery: 15,
    position: { x, y, z: 1 },
    ...emitterOptions,
    particleOptions: {
      ttl: 600,
      content: '',
      style: {
        background: '#D12E2E',
        width: '20px',
        height: '20px',
        scale: [1, 0.25],
        'border-radius': '50%',
      },
      onCreate(particle: TextParticle) {
        particle.velocity.x = random(-75, 75)
        particle.velocity.y = -150
        particle.acceleration.y = 1000
      },
      ...particleOptions,
    }
  } as EmitterOptions)
}

export const life = (x: number, y: number, emitterOptions: EmitterOptions = {}, particleOptions: ParticleOptions = {}) => {
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
      onCreate(particle: TextParticle) {
        particle.velocity.x = random(-150, 150)
        particle.velocity.y = random(-250, 250)
      },
      ...particleOptions,
    }
  } as EmitterOptions)
}

export const xp = (x: number, y: number, emitterOptions: EmitterOptions = {}, particleOptions: ParticleOptions = {}) => {
  domParticles.addEmitter({
    maxEmissions: 10,
    ttl: 500,
    emitEvery: 25,
    position: { x, y, z: 2 },
    ...emitterOptions,
    particleOptions: {
      ttl: 500,
      contents: '✨',
      style: {
        color: '#ff0',
        'font-size': '16px',
        scale: [.5, 1.25],
      },
      onCreate(particle: TextParticle) {
        particle.velocity.x = random(-50, 50)
        particle.velocity.y = random(-100, 100)
      },
      ...particleOptions,
    }
  } as EmitterOptions)
}

export const multiplier = (x: number, y: number, emitterOptions: EmitterOptions = {}, particleOptions: ParticleOptions = {}) => {
  domParticles.addEmitter({
    maxEmissions: 15,
    ttl: 500,
    emitEvery: 25,
    position: { x, y, z: 2 },
    ...emitterOptions,
    particleOptions: {
      ttl: 500,
      contents: '☀',
      style: {
        color: '#fff',
        opacity: 0.5,
        'font-size': '24px',
        scale: [0.5, 2],
      },
      onCreate(particle: TextParticle) {
        particle.velocity.x = random(-150, 150)
        particle.velocity.y = random(-250, 250)
      },
      ...particleOptions,
    }
  } as EmitterOptions)
}

export const addEmitter = (x: number, y: number, emitterOptions: EmitterOptions = {}, particleOptions: ParticleOptions = {}) => {
  domParticles.addEmitter({
    maxEmissions: 10,
    ttl: 500,
    emitEvery: 25,
    position: { x, y, z: 2 },
    ...emitterOptions,
    particleOptions,
  } as EmitterOptions)
}
