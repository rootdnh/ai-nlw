import { FastifyInstance } from "fastify"
import {prisma} from "../lib/prisma"
import {streamToResponse, AIStream, OpenAIStream} from "ai"
import { createReadStream } from "fs"
import {z} from "zod"
import {openai} from "../lib/openia"

export async function  generateIdCompletion(app: FastifyInstance) {
  app.post('/ai-complete', async (request, reply)=>{
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5)
    })


    const {videoId, prompt, temperature} = paramsSchema.parse(request.body)
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })

    if(!video.trasncription){
      return reply.status(400).send({error: "Video transcription was not generated yet"})
    }

    const promptMessage = prompt.replace('{transcription}', video.trasncription)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        {role: 'user', content: promptMessage}
      ],
      stream: true,

    })
    const stream = OpenAIStream(response)
    streamToResponse(stream, reply.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      }
    })
  })
}