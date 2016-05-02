import test from 'ava'
import prefix from '../prefix'

test('returns an array', t => {
  t.true(Array.isArray(prefix('test', {})))
})

test('returns empty array if no matches', t => {
  t.is(prefix('w', {ignore: 'a'}).length, 0)
  t.is(prefix('a.b', {ignore: 'a', actual: { ignore: 'b'}}).length, 0)
})

test('returns options for single prefix', t => {
  t.deepEqual(prefix('w', {watch: 'a'}), ['a'])
  t.deepEqual(prefix('w', {watch: 'a', wait: 'b'}), ['a', 'b'])
  t.deepEqual(prefix('w', {watch: 'a', wait: 'b', ignore: 'c'}), ['a', 'b'])
})

test('returns options for multiple prefixes', t => {
  t.deepEqual(prefix('w.j', {
    wrong: 'wrong',
    watch: {
      javascript: 'js',
      jank: 'jsx'
    }
  }), ['js', 'jsx'])
})

test('does not flatten results', t => {
  t.deepEqual(prefix('w', {
    watch: {
      js: 'a',
    },
    write: 'e'
  }), [{ js: 'a' }, 'e'])
})
