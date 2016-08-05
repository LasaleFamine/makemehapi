const
  Hapi = require('hapi')
  Joi = require('joi')


const server = new Hapi.Server()


let loggedMsg = (req, reply) => {
  reply('login successful');
}

let routeConfig = {
    path: '/login',
    method: 'POST',
    handler: loggedMsg,
    config: {
        validate: {
           payload: Joi.object({
                isGuest: Joi.boolean(),
                username: Joi.string(),
                password: Joi.string().alphanum(),
                accessToken: Joi.string().alphanum()
           })
           .options({allowUnknown: true})
           .with('username', 'isGuest')
           .without('password', 'accessToken')
        }
    }
}



server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route(routeConfig)


server.start( () => {
  console.log("Server start at:", server.info.uri)
})
