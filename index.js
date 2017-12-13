const http = require('http')
const config = require('config')
const web = require('./app/web')
const server = http.createServer(web.callback())
const io = require('socket.io')(server)

require('./app/io')(io)

server.listen(config.get('port'))