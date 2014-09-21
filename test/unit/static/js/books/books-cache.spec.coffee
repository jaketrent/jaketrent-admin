should = require 'should'

cache = require '../../../../../app/static/js/components/books/books-cache'

describe 'books-cache', ->

  beforeEach ->
    cache.clear()

  describe '#cache', ->

    it 'takes data, filter, and page args', ->
      cache.cache.should.be.type 'function'
      cache.cache.length.should.eql 3 # data, filter, page

    it 'is chainable', ->
      cache.cache().should.eql cache

  it 'caches a list at * if no filter', ->
    models = [{ id: 1 }, { id: 2 }]
    cache.cache(models)
    cache.get().should.eql models

  it 'caches based on the data matching the filter', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    cache.cache(models, { type: null })
    cache.get({ type: 'something' }).should.eql models

  it 'caches different items at different ids', ->
    model = { id: 123 }
    cache.cache(model, { id: null })
    cache.get({ id: 123 }).should.eql model

    model2 = { id: 234 }
    cache.cache(model2, { id: null })

    cache.get({ id: 123 }).should.eql model
    cache.get({ id: 234 }).should.eql model2

  it 'stores and accesses pages separately', ->
    models = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, ]
    cache.cache(models.slice(0, 1), null, 1)
    cache.get(null, 1).should.eql models.slice(0, 1)

    cache.cache(models.slice(2, 3), null, 2)
    cache.get(null, 1).should.not.eql models.slice(2, 3)
    cache.get(null, 2).should.eql models.slice(2, 3)

  it 'changes the key based on the filter input', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    cache.cache(models, { type: null })
    cache.get({ type: 'something' }).should.eql models

    # cache assumes that whatever filtered in the first place, found the data,
    # and now passes to cache will make sense.  Note here that if we (wrongly)
    # change the filter to id, still both models are found in the cache
    # even though the second model has a different id.  In other words, the
    # cache doesn't enforce good data sets, it just makes data caching and retrieval
    # consistent given an input
    cache.cache(models, { id: null })
    cache.get({ id: 1 }).should.eql models

  it 'overwrites changes at the same key if filter the same', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    models2 = [{ id: 2, type: 'something' }, { id: 3, type: 'something' }]
    cache.cache(models, { type: null })
    cache.get({ type: 'something' }).should.eql models
    cache.cache(models2, { type: null })
    cache.get({ type: 'something' }).should.eql models2

  it 'uncaches wildcard filter but not other keys not uncached', ->
    models = [{ id: 1 }, { id: 2 }]
    models2 = [{ id: 2 }, { id: 3 }]
    cache.cache(models)
    cache.cache(models2, { id: null })
    cache.get().should.eql models
    cache.uncache()
    should.not.exist cache.get()
    cache.get({ id: 2 }).should.eql models2

  it 'uncaches things that are already cached by the same filter and page', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    cache.cache(models)
    cache.uncache({ type: 'something' })
    should.not.exist cache.get({ type: 'something' })

  it 'accepts cache filter as an array of string', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    cache.cache(models, [ 'type' ])
    cache.get({ type: 'something' }).should.eql models

  it 'accepts a page but no filter as two arguments', ->
    models = [{ id: 2 }, { id: 3 }]
    cache.cache(models, 2)
    cache.get(2).should.eql models