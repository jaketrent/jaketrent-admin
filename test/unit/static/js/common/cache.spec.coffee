should = require 'should'

Cache = require '../../../../../app/static/js/common/cache'

describe 'cache', ->

  cache = null

  beforeEach ->
    cache = new Cache()

  it 'caches a list at * if no filter', ->
    models = [{ id: 1 }, { id: 2 }]
    cache.setItem(models)
    cache.getItem().should.eql models

  it 'caches based on the data matching the filter', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    cache.setItem(models, { type: null })
    cache.getItem({ type: 'something' }).should.eql models

  it 'caches different items at different ids', ->
    model = { id: 123 }
    cache.setItem(model, { id: null })
    cache.getItem({ id: 123 }).should.eql model

    model2 = { id: 234 }
    cache.setItem(model2, { id: null })

    cache.getItem({ id: 123 }).should.eql model
    cache.getItem({ id: 234 }).should.eql model2

  it 'stores and accesses pages separately', ->
    models = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, ]
    cache.setItem(models.slice(0, 1), null, 1)
    cache.getItem(null, 1).should.eql models.slice(0, 1)

    cache.setItem(models.slice(2, 3), null, 2)
    cache.getItem(null, 1).should.not.eql models.slice(2, 3)
    cache.getItem(null, 2).should.eql models.slice(2, 3)

  it 'changes the key based on the filter input', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    cache.setItem(models, { type: null })
    cache.getItem({ type: 'something' }).should.eql models

    # cache assumes that whatever filtered in the first place, found the data,
    # and now passes to cache will make sense.  Note here that if we (wrongly)
    # change the filter to id, still both models are found in the cache
    # even though the second model has a different id.  In other words, the
    # cache doesn't enforce good data sets, it just makes data caching and retrieval
    # consistent given an input
    cache.setItem(models, { id: null })
    cache.getItem({ id: 1 }).should.eql models

  it 'overwrites changes at the same key if filter the same', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    models2 = [{ id: 2, type: 'something' }, { id: 3, type: 'something' }]
    cache.setItem(models, { type: null })
    cache.getItem({ type: 'something' }).should.eql models
    cache.setItem(models2, { type: null })
    cache.getItem({ type: 'something' }).should.eql models2

  it 'uncaches default filter but not other keys not uncached', ->
    models = [{ id: 1 }, { id: 2 }]
    models2 = [{ id: 2 }, { id: 3 }]
    cache.setItem(models)
    cache.setItem(models2, { id: null })
    cache.getItem().should.eql models
    cache.removeItem()
    should.not.exist cache.getItem()
    cache.getItem({ id: 2 }).should.eql models2

  it 'uncaches things that are already cached by the same filter and page', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    cache.setItem(models)
    cache.removeItem({ type: 'something' })
    should.not.exist cache.getItem({ type: 'something' })

  it 'accepts cache filter as an array of string', ->
    models = [{ id: 1, type: 'something' }, { id: 2, type: 'something' }]
    cache.setItem(models, [ 'type' ])
    cache.getItem({ type: 'something' }).should.eql models

  it 'accepts a page but no filter as two arguments', ->
    models = [{ id: 2 }, { id: 3 }]
    cache.setItem(models, 2)
    cache.getItem(2).should.eql models

  describe '#getAllItems', ->

    it 'can return all items, in order, for all pages in the default filter', ->
      models = [{ id: 0 }, { id: 1 }]
      models2 = [{ id: 2 }, { id: 3 }]
      cache.setItem(models, 1)
      cache.setItem(models2, 2)
      cache.getAllItems().should.eql models.concat(models2)

    it 'collapses empty pages', ->
      models = [{ id: 0 }, { id: 1 }]
      models2 = [{ id: 2 }, { id: 3 }]
      cache.setItem([], 1)
      cache.setItem(models, 2)
      cache.setItem(null, 3)
      cache.setItem(models2, 4)
      cache.getAllItems().should.eql models.concat(models2)

    it 'all items are returned de-duped', ->
      models = [{ id: 0 }, { id: 1 }]
      models2 = [{ id: 2 }, { id: 3 }]
      cache.setItem(models, 1)
      cache.setItem(models2, 2)
      cache.setItem(models, 3)
      cache.getAllItems().should.eql models.concat(models2)

  describe '#getLastPageNumber', ->

    it 'returns page 1 if nothing in the cache', ->
      cache.getLastPageNumber().should.eql 1

    it 'returns the last page number for default filter', ->
      lastPage = 4
      models = [{ id: 0 }, { id: 1 }]
      models2 = [{ id: 2 }, { id: 3 }]
      cache.setItem(models, 1)
      cache.setItem(models2, lastPage)
      cache.getLastPageNumber().should.eql lastPage

    it 'returns the last page number for custom filter', ->
      filter = { suchFilter: null }
      lastPage = 4
      models = [{ id: 0 }, { id: 1 }]
      models2 = [{ id: 2 }, { id: 3 }]
      cache.setItem(models, filter, 1)
      cache.setItem(models2, filter, lastPage)
      cache.getLastPageNumber(filter).should.eql lastPage

    it 'returns last non-null page number', ->
      filter = { suchFilter: null }
      lastPage = 4
      models = [{ id: 0 }, { id: 1 }]
      models2 = [{ id: 2 }, { id: 3 }]
      cache.setItem(models, filter, lastPage)
      cache.setItem(models2, filter, 7)
      cache.removeItem(filter, 7)
      cache.getLastPageNumber(filter).should.eql lastPage


