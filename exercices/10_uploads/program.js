const
  Hapi = require('hapi')
  Joi = require('joi')


const server = new Hapi.Server()

let handler = (req, reply) => {
  let body = ''
  let returnObject = {
    description: 'makemehapi',
    file: {
      data: body,
      filename: req.payload.file.hapi.filename,
      headers: req.payload.file.hapi.headers
    }
  }

  req.payload.file.on('data', (data) => {
    body += data
  })
  req.payload.file.on('end', () => {
    returnObject.file.data = body
    reply(returnObject)
  })

}

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/upload',
  method: 'POST',
  config: {
      payload: {
        output: 'stream',
        parse: true
      },
      handler: handler,
  }

})


server.start( () => {
  console.log("Server start at:", server.info.uri)
})
