'use strict'

const http = require('http')

const server = http.createServer((request, response) => {
  console.log(`Received request for URL: ${request.url}`)
  response.writeHead(200)
  response.end('Hello World!')
})

server.listen(8080)
