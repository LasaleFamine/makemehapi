const
  Hapi = require('hapi')
  Boom = require('boom')


const server = new Hapi.Server()

let setCookie = (req, reply) => {
  return reply({ message: 'success' }).state('session', {key: 'makemehapi'})
}

let getCookie = (req, reply) => {
  let cookie = req.state.session
  if(!cookie) {
    reply({user: 'hapi'})
  } else {
    reply(Boom.badRequest("Invalid cookie value"))
  }

}

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.state('session', {
    path: '/',
    encoding: 'base64json',
    ttl: 10,
    domain: 'localhost'
})

server.route({
  path: '/set-cookie',
  method: 'GET',
  handler: setCookie,
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
})

server.route({
  path: '/check-cookie',
  method: 'GET',
  handler: getCookie,
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
})


server.start( () => {
  console.log("Server start at:", server.info.uri)
})
