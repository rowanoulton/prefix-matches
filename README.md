Prefix Matches
---

Find matching keys in a given object, for a given prefix string

**Warning**: experimental

## Installation

	npm i --save prefix-matches
	
then, in your scripts:

```js
const prefixMatches = require('prefix-matches')
```

## Example

```js
const prefixMatches = require('prefix-matches')

prefixMatches('w', {
	watchJs: 'watch javascript',
	watchCss: 'watch css'
}) // => ['watch javascript', 'watch css']

prefixMatches('w', {
	watch: {
		js: 'watch javascript',
		css: 'watch css'
	},
	build: 'build things'
}) // => ['watch javascript', 'watch css']

prefixMatches('w.j', {
	watch: {
		js: 'watch javascript',
		css: 'watch css'
	}
}) // => ['watch javascript']
```

## Why?

An attempt to provide better prefixing support for the [package-scripts](https://github.com/kentcdodds/p-s) project. 

## Tests

A basic test suite has been authored in [AVA](https://github.com/sindresorhus/ava), used for its terrifying speed. To run it:

	npm test