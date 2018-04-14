'use strict'

var isObject = require('is-object')
var startsWith = require('starts-with')

module.exports = function (input, scripts) {
  var prefixes = input.split('.')
  var depth = 0
  var results = searchForPrefix(scripts, depth, prefixes)
  return results
}

function searchForPrefix(currentScripts, depth, prefixes, propertyChain, results) {
  propertyChain = propertyChain || []
  results = results || []
  Object.keys(currentScripts).forEach(function (key) {
    var isLastPrefix = depth === prefixes.length - 1
    var result = {}
    if (startsWith(key, prefixes[depth])) {
      propertyChain.push(key)
      if (!isLastPrefix && isObject(currentScripts[key])) {
        searchForPrefix(currentScripts[key], depth + 1, prefixes, propertyChain, results)
      } else {
        var resultKey = propertyChain.join('.')
        result[resultKey] = currentScripts[key]

        if (resultKey === prefixes.join('.')) {
          // if we have full match, place it as a first result
          // because it has biggest relevance
          results.unshift(result)
        } else {
          results.push(result)
        }
      }
      propertyChain.pop()
    }
  })
  if (depth === 0) {
    return results
  }
}
