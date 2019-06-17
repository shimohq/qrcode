const Koa = require('koa')
const Router = require('koa-router')
const qr = require('node-qr-image')
const pkg = require('./package.json')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = `${pkg.name}@${pkg.version}`
})

router.get('/qrcode', (ctx, next) => {
  let content = ''
  const url = ctx.request.url
  let position = url.indexOf('content=')
  content = url.slice(position + 8)

  if (position < 0) {
    position = url.indexOf('url=')
    content = url.slice(position + 4)
  }

  if (position < 0) {
    ctx.status = 400
    ctx.body = {
      errorMessage: 'Missing content argument'
    }
    return
  }

  let { size, type, margin } = ctx.request.query
  size = parseInt(ctx.request.query.size) || 200
  type = ctx.request.query.type === 'svg' ? 'svg' : 'png'
  margin = parseInt(margin) || 0

  ctx.type = type

  ctx.body = qr.image(content, {
    type, size, margin
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app
