'use strict'

var isObject = require('is-object')
var startsWith = require('starts-with')

var startsWithPrefix = function (prefix, key) {
  return startsWith(key, prefix)
}

module.exports = function (input, scripts) {
  var prefixes = input.split('.')
  var startsWithFilter
  var isLastPrefix
  var matches
  var results
  var keys

  // Ensure script begins as an array for interal loop
  if (!Array.isArray(scripts)) scripts = [scripts]

  for (var i = 0; i < prefixes.length; i++) {
    startsWithFilter = startsWithPrefix.bind(null, prefixes[i])
    isLastPrefix = i === (prefixes.length - 1)
    results = []

    for (var script of scripts) {
      keys = Object.keys(script)

      matches = keys.filter(startsWithFilter).filter(function (key) {
        // Ignore non-objects unless we're at the last level
        return isLastPrefix || isObject(script[key])
      })

      results = results.concat(matches.map(function (match) {
        return script[match]
      }))
    }

    scripts = results
  }

  return results
}
