import path from 'path'
import { fileURLToPath } from 'url'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { createServer as createChatServer } from '@hexlet/chat-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function buildServer() {
  const fastify = Fastify()

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'frontend', 'dist'),
    prefix: '/',
  })

  fastify.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html')
  })

  createChatServer(fastify.server)

  return fastify
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const app = await buildServer()
  const port = process.env.PORT || 5001
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`Server listening on ${port}`)
}
