const
  Hapi = require('hapi'),
  Inert = require('inert'),
  Vision = require('vision'),
  path = require('path')


const server = new Hapi.Server()

/**
 * Middleware
 * - Vision for res with Views
 */
server.register(Vision, (err) => {
  if (err) throw err
})

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, 'templates'),
  helpersPath: path.join(__dirname, 'helpers')
})

server.route({
  path: '/',
  method: 'GET',
  handler: {
    view: 'index.html'
  }
})



server.start( () => {
  console.log("Server start at:", server.info.uri)
})
