import random from 'lodash/random'
import { pickRandom } from '@/utils'
import {
  adverbs,
  maleNames, femaleNames, lastNames,  nickNames,
  eyeColors, hairColors, skinColors,
  smallSizes, normalSizes, largeSizes,
  strong, weak, short, tall,
  poor, rich,
  stateMoods, intelligence, traits,
  jobs, jobLevels, jobDomains,
} from '@/words'
import { capitalize } from 'lodash';

export const city = () => {
  // name
  // population
}

export const district = () => {
  // name
}

export const building = () => {
  // name
  // commercial domain
  // opening hours
}

export const room = () => {
}

export const npc = ({ female, kid, old } = {}) => {
  const firstname = pickRandom(female ? femaleNames : maleNames)
  const lastname = pickRandom(lastNames)
  const nickname = pickRandom(nickNames)
  const age = kid
    ? random(1, 17)
    : (old
      ? random(61, 90)
      : random(18, 60)
    )
  const eyeColor = pickRandom(eyeColors)
  const hairColor = pickRandom(hairColors)
  const skinColor = pickRandom(skinColors)
  let build
  switch (random(1, 3)) {
    case 1:
      build = pickRandom(smallSizes)
      break
    case 2:
      build = pickRandom(normalSizes)
      break
    default:
      build = pickRandom(largeSizes)
  }
  let size
  switch (random(1, 2)) {
    case 1:
      size = pickRandom(short)
      break
    default:
      size = pickRandom(tall)
  }
  let strength
  switch (random(1, 2)) {
    case 1:
      strength = pickRandom(weak)
      break
    default:
      strength = pickRandom(strong)
  }
  let status = ''
  if (!kid) {
    switch (random(1, 2)) {
      case 1:
        strength = pickRandom(poor)
        break
      default:
        strength = pickRandom(rich)
    }
  }
  const mood = pickRandom(stateMoods)
  const mind = pickRandom(intelligence)
  const trait = pickRandom(traits)
  const job = pickRandom(jobs)
  const jobLevel = pickRandom(jobLevels)
  const jobDomain = pickRandom(jobDomains)

  const npc = {
    firstname,
    lastname,
    nickname,
    age,
    eyeColor,
    hairColor,
    skinColor,
    build: `${pickRandom(adverbs)} ${build}`,
    size: `${pickRandom(adverbs)} ${size}`,
    strength: `${pickRandom(adverbs)} ${strength}`,
    status: `${pickRandom(adverbs)} ${status}`,
    mood: `${pickRandom(adverbs)} ${mood}`,
    mind: `${pickRandom(adverbs)} ${mind}`,
    trait,
    job: `${jobLevel} ${jobDomain} ${job}`,
  }

  const id = female ? 'she' : 'he'

  return {
    ...npc,
    description: (name = true) => `${name ? `${capitalize(npc.firstname)} ${capitalize(npc.lastname)}` : ''}, 
     also known as "${capitalize(npc.nickname)}", is a ${npc.age} years old, ${npc.skinColor} skin, 
     ${npc.eyeColor} eyes, ${npc.build} and ${npc.size}, ${npc.job}.
     ${capitalize(id)} is ${npc.mind}, ${npc.trait} and a ${npc.mood} type of person.`,
  }
}
