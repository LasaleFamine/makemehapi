const
  Hapi = require('hapi'),
  rot = require('rot'),
  path = require('path'),
  fs = require('fs')


const server = new Hapi.Server()

let convertAndSend = (req, reply) => {
  let stream = fs.readFileSync(path.join(__dirname, 'file'), {encoding: 'UTF-8'})
  reply(rot(stream, 13))
}

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/',
  method: 'GET',
  handler: convertAndSend
})



server.start( () => {
  console.log("Server start at:", server.info.uri)
})
