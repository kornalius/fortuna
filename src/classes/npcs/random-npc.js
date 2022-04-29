import random from 'lodash/random'
import omit from 'lodash/omit'
import capitalize from 'lodash/capitalize'
import compact from 'lodash/compact'
import Npc from './npc'
import { pickRandom, registerClass } from '@/utils'
import {
  adverbs,
  eyeColors,
  femaleNames,
  hairColors,
  intelligence,
  jobDomains,
  jobLevels,
  jobs,
  largeSizes,
  lastNames,
  maleNames,
  motives,
  nickNames,
  normalSizes,
  poor,
  rich,
  short,
  skinColors,
  smallSizes,
  stateMoods,
  strong,
  tall,
  traits,
  weak
} from '@/words'

const jobIcons = {
  'scientist': ['astronaut', 'astronomer', 'biologist', 'chemist', 'cook', 'dentalcase', 'microbiologist', 'paramedic',
    'physician', 'physicist', 'physiologist', 'therapist', 'toxicologist', 'veterinary', 'generalist', 'technician',
    'technologist'],

  'doctor': ['anesthesiologist', 'hygienist', 'dentist', 'doctor', 'nurse'],

  'construction': ['assembler', 'carpenter', 'electrician', 'machinists', 'painter', 'plumber', 'welder', 'controller', 'engineer',
    'mechanic', 'operator', 'worker'],

  'business': ['economist', 'marketer', 'publicist', 'advisor', 'buyer', 'consultant', 'estimator', 'examiner', 'manager',
    'recruiter', 'representative', 'scheduler', 'specialist', 'strategist', 'verificator'],

  'boss': ['attorney', 'broker', 'lawer', 'administrator', 'advocate', 'collector', 'curator', 'director', 'inspector',
    'president', 'regulator', 'superintendent'],

  'casual': ['archivist', 'bartender', 'captain', 'cashier', 'coach', 'concierge', 'courier', 'dispatcher', 'housekeeper',
    'janitor', 'journalist', 'librarian', 'merchant', 'meteorologist', 'pilot', 'psychiatric', 'receptionist', 'reporter',
    'secretary', 'agent', 'ambassador', 'analyst', 'architect', 'coder', 'commander', 'communicator', 'coordinator',
    'counselor', 'designer', 'developer', 'expeditor', 'forecaster', 'integrator', 'interpreter', 'investigator', 'messenger',
    'officer', 'personel', 'planner', 'processor', 'producer', 'programmer', 'researcher', 'scientist', 'tester', 'trainer'],
}

const jobColors = {
  'scientist': [],
  'doctor': [],
  'construction': ['blue', 'beige'],
  'business': ['blue', 'beige'],
  'boss': ['blue', 'beige'],
  'casual': ['blue', 'beige', 'yellow', 'red', 'green', 'black'],
}

const randomize = (sets) => {
  const s = random(0, sets.length - 1)
  return pickRandom(sets[s])
}

export default class RandomNpc extends Npc {
  setupInstance(data) {
    const { old, kid } = data
    data = omit(data, ['old', 'kid'])

    const age = data.age ||
      (kid
        ? random(1, 17)
        : (old
          ? random(61, 90)
          : random(18, 60)
        )
      )

    const female = typeof data.female === 'boolean' ? data.female : pickRandom([true, false])
    const job = data.job || pickRandom(jobs)

    return super.setupInstance({
      color: pickRandom(jobColors[this.iconKeyFor(job)]),
      firstname: pickRandom(female ? femaleNames : maleNames),
      lastname: pickRandom(lastNames),
      nickname: pickRandom(nickNames),
      female,
      age,
      eyeColor: pickRandom(eyeColors),
      hairColor: pickRandom(hairColors),
      skinColor: pickRandom(skinColors),
      build: randomize([smallSizes, normalSizes, largeSizes]),
      size: randomize([short, tall]),
      strength: randomize([weak, strong]),
      status: randomize([poor, rich]),
      mood: pickRandom(stateMoods),
      motives: pickRandom(motives),
      mind: pickRandom(intelligence),
      trait: pickRandom(traits),
      job,
      jobLevel: pickRandom(jobLevels),
      jobDomain: pickRandom(jobDomains),
      buildAdv: pickRandom(adverbs),
      sizeAdv: pickRandom(adverbs),
      strengthAdv: pickRandom(adverbs),
      statusAdv: pickRandom(adverbs),
      moodAdv: pickRandom(adverbs),
      mindAdv: pickRandom(adverbs),
      ...data,
    })
  }

  get name() {
    return this.state.name || `${capitalize(this.firstname)} ${capitalize(this.lastname)}`
  }

  get icon() {
    if (this.isKid) {
      return compact(['kid', this.iconSuffix]).join('-')
    }
    return compact([this.state.icon || this.iconKey, this.iconSuffix]).join('-')
  }

  get iconKey() {
    return this.iconKeyFor(this.job)
  }

  get iconSuffix() {
    return compact([this.state.iconSuffix, this.female ? 'female' : 'male', this.color]).join('-')
  }

  get color() { return this.state.color }
  set color(value) { this.state.color = value }

  get firstname() { return this.state.firstname }
  set firstname(value) { this.state.firstname = value }

  get lastname() { return this.state.lastname }
  set lastname(value) { this.state.lastname = value }

  get nickname() { return this.state.nickname }
  set nickname(value) { this.state.nickname = value }

  get age() { return this.state.age }
  set age(value) { this.state.age = value }

  get eyeColor() { return this.state.eyeColor }
  set eyeColor(value) { this.state.eyeColor = value }

  get hairColor() { return this.state.hairColor }
  set hairColor(value) { this.state.hairColor = value }

  get skinColor() { return this.state.skinColor }
  set skinColor(value) { this.state.skinColor = value }

  get motives() { return this.state.motives }
  set motives(value) { this.state.motives = value }

  get buildAdv() { return this.state.buildAdv }
  set buildAdv(value) { this.state.buildAdv = value }

  get build() { return this.state.build }
  set build(value) { this.state.build = value }

  get sizeAdv() { return this.state.sizeAdv }
  set sizeAdv(value) { this.state.sizeAdv = value }

  get size() { return this.state.size }
  set size(value) { this.state.size = value }

  get strengthAdv() { return this.state.strengthAdv }
  set strengthAdv(value) { this.state.strengthAdv = value }

  get strength() { return this.state.strength }
  set strength(value) { this.state.strength = value }

  get statusAdv() { return this.state.statusAdv }
  set statusAdv(value) { this.state.statusAdv = value }

  get status() { return this.state.status }
  set status(value) { this.state.status = value }

  get moodAdv() { return this.state.moodAdv }
  set moodAdv(value) { this.state.moodAdv = value }

  get mood() { return this.state.mood }
  set mood(value) { this.state.mood = value }

  get mindAdv() { return this.state.mindAdv }
  set mindAdv(value) { this.state.mindAdv = value }

  get mind() { return this.state.mind }
  set mind(value) { this.state.mind = value }

  get traitAdv() { return this.state.traitAdv }
  set traitAdv(value) { this.state.traitAdv = value }

  get trait() { return this.state.trait }
  set trait(value) { this.state.trait = value }

  get jobLevel() { return this.state.jobLevel }
  set jobLevel(value) { this.state.jobLevel = value }

  get jobDomain() { return this.state.jobDomain }
  set jobDomain(value) { this.state.jobDomain = value }

  get job() { return this.state.job }
  set job(value) { this.state.job = value }

  get isKid() { return this.age <= 17 }

  get isOld() { return this.age >= 61 && this.age <= 99 }

  get description() {
    const id = this.female ? 'she' : 'he'
    const his = this.female ? 'her' : 'his'

    return `${this.name}, also known as "${capitalize(this.nickname)}", 
      is a ${this.age} years old, ${this.skinColor} skin, ${this.eyeColor} eyes, ${this.buildAdv} ${this.build} 
      and ${this.sizeAdv} ${this.size}, ${this.jobLevel} ${this.jobDomain} ${this.job}. 
      ${capitalize(his)} main motive in life is to ${this.motives}. 
      ${capitalize(id)} is ${this.mindAdv} ${this.mind}, 
      ${this.traitAdv} ${this.trait} and a ${this.moodAdv} ${this.mood} type of person.`
  }

  iconKeyFor(job) {
    return Object.keys(jobIcons).find(k => jobIcons[k].includes(job))
  }
}

registerClass(RandomNpc)
