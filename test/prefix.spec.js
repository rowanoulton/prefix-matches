import test from 'ava'
import prefix from '../prefix'

test('returns an array', t => {
  t.true(Array.isArray(prefix('test', {})))
})

test('returns empty array if no matches', t => {
  t.is(prefix('w', {ignore: 'a'}).length, 0)
  t.is(prefix('a.b', {ignore: 'a', actual: { ignore: 'b'}}).length, 0)
})

test('resolves single prefixes', t => {
  t.deepEqual(prefix('w', {watch: 'a'}), ['a'])
  t.deepEqual(prefix('w', {watch: 'a', wait: 'b'}), ['a', 'b'])
  t.deepEqual(prefix('w', {watch: 'a', wait: 'b', ignore: 'c'}), ['a', 'b'])
})

test('resolves nested prefixes', t => {
  t.deepEqual(prefix('w.j', {
    watch: {
      js: 'watch javascript',
      css: 'watch css'
    },
    write: {
      js: 'write javascript'
    }
  }), ['watch javascript', 'write javascript'])
})

test ('resolves _really_ nested prefixes', t => {
  t.deepEqual(prefix('b.f.j', {
    build: {
      frontend: {
        js: 'build javascript',
        css: 'build css'
      }
    }
  }), ['build javascript'])
})

test('does not flatten results', t => {
  t.deepEqual(prefix('w', {
    watch: {
      js: 'watch javascript',
      css: 'watch css'
    },
    build: 'build things'
  }), [{js: 'watch javascript', css: 'watch css'}])
})
