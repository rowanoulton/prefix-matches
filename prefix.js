'use strict'

const traverse = require('traverse')
const isObject = require('is-object')
const startsWith = require('starts-with')

const startsWithPrefix = (prefix, key) => {
  return startsWith(key, prefix)
}

const flattenObj = (obj) => {
  return traverse(obj).reduce(function (leaves, value) {
    if (this.isLeaf) leaves.push(value)
    return leaves
  }, [])
}

module.exports = (input, scripts) => {
  const prefixes = input.split('.')
  let startsWithFilter
  let isLastPrefix
  let matches
  let results
  let leaves
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

  for (let i = 0; i < results.length; i++) {
    if (isObject(results[i])) {
      leaves = flattenObj(results[i])
      Array.prototype.splice.apply(results, [0, 1].concat(leaves))

      // Skip past the new entries we've spliced in
      i += leaves.length
    }
  }

  return results
}
