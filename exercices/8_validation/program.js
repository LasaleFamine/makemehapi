const
  Hapi = require('hapi')
  Joi = require('joi')


const server = new Hapi.Server()

let handler = (req, reply) => {
  reply('You asked for the chicken ' + request.params.breed);
}

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/chickens/{breed}',
  method: 'GET',  
  config: {
      handler: handler,
      validate: {
          params: {
              breed: Joi.string().required()
          }
      }
  }

})


server.start( () => {
  console.log("Server start at:", server.info.uri)
})
