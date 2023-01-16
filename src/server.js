import http, { createServer } from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'



const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (rout) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end('Not found')
})

server.listen(3333)