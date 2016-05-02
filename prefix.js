'use strict'

const isObject = require('is-object')
const startsWith = require('starts-with')

const startsWithPrefix = (prefix, key) => {
  return startsWith(key, prefix)
}

module.exports = (input, scripts) => {
  const prefixes = input.split('.')
  let startsWithFilter
  let isLastPrefix
  let matches
  let results
  let keys

  // Ensure script begins as an array for interal loop
  if (!Array.isArray(scripts)) scripts = [scripts]

  for (let i = 0; i < prefixes.length; i++) {
    startsWithFilter = startsWithPrefix.bind(null, prefixes[i])
    isLastPrefix = i === (prefixes.length - 1)
    results = []

    for (let script of scripts) {
      keys = Object.keys(script)

      matches = keys.filter(startsWithFilter).filter(key => {
        // Ignore non-objects unless we're at the last level
        return isLastPrefix || isObject(script[key])
      })

      results = results.concat(matches.map(match => {
        return script[match]
      }))
    }

    scripts = results
  }

  return results
}
