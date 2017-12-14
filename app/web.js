const path = require('path')
const config = require('config')
const Koa = require('koa')
const koaStatic = require('koa-static')
const session = require('koa-session')

const app = new Koa()
app.keys = config.get('keys')

app.use(koaStatic(path.join(__dirname, 'public'), {
  maxage: 0
}))

app.use(session(app))
app.use(async ctx => {
  ctx.body = 'Hello World'
})

module.exports = app