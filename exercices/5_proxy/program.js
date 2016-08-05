const
  Hapi = require('hapi'),
  H2o2 = require('h2o2')


const server = new Hapi.Server()

/**
 * Middleware
 * - H2o2 for res to redirect to a proxy
 */
server.register(H2o2, (err) => {
  if (err) throw err
})

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})


server.route({
  path: '/proxy',
  method: 'GET',
  handler: {
    proxy: {
      host: '127.0.0.1',
      port: 65535
    }
  }
})



server.start( () => {
  console.log("Server start at:", server.info.uri)
})
