import page from 'page'

import * as config from '../config'
import * as domUtil from './util/dom'

function formatParams(ctx) {
  return ctx.params
}

export function route(url, ...handlers) {
  let renderHandler = handlers.pop()
  let modifiedRenderHandler = function (ctx) {
    renderHandler(domUtil.getAppNode(), formatParams(ctx))
  }
  let handlersWithParams = handlers.map(handler => {
    return function (ctx, next) {
      handler(formatParams(ctx), next)
    }
  })
  let args = [ url ].concat(handlersWithParams).concat(modifiedRenderHandler)

  page.apply(this, args)
}

export function redirect(url) {
  if (/^http.*/.test(url))
    window.location = url
  else
    page.redirect(url)
}

export function currentUrl() {
  return window.location
}

export function baseUrl() {
  return config.at('appBaseUrl')
}

export function start() {
  page.base(baseUrl())
  page()
}
