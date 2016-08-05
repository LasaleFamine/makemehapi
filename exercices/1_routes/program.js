const Hapi = require('hapi')
const server = new Hapi.Server()

let getHome = (req, reply) => {
  let name = encodeURIComponent(req.params.name)
  reply('Hello ' + name)
}

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/{name}',
  method: 'GET',
  handler: getHome
})

server.start( () => {
  console.log("Server start at:", server.info.uri)
})
