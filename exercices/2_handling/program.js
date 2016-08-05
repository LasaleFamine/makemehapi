const
  Hapi = require('hapi'),
  Inert = require('inert'),
  path = require('path')

const server = new Hapi.Server()

/**
 * Middleware
 * - Inert for res with static files
 */
server.register(Inert, (err) => {
  if (err) throw err
})

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/',
  method: 'GET',
  handler: {
    file: path.join(__dirname, 'index.html')
  }
})

server.start( () => {
  console.log("Server start at:", server.info.uri)
})
