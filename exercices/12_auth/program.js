const
  Hapi = require('hapi'),
  Auth = require('hapi-auth-basic')
  Boom = require('boom')


const server = new Hapi.Server()

let validate = (req, user, password, callback) => {
  if(user === 'hapi' && password === 'auth') {
    callback(null, true, { id: "ciao213", name: user} )
  } else {
    callback(Boom.unauthorized('Bad username or password', 'sample', {error: 'Bad username or password'}), false)
  }
}

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

/**
 * Middleware
 * - Auth basic for basic username/password authentication
 */
server.register(Auth, (err) => {
  if (err) throw err
})



server.auth.strategy('simple', 'basic', { validateFunc: validate });

server.route({
    method: 'GET',
    path: '/',
    config: {
        auth: 'simple',
        handler: (request, reply) => {
            reply();
        }
    }
})




server.start( () => {
  console.log("Server start at:", server.info.uri)
})
