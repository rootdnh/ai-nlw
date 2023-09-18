import {fastify} from 'fastify'
import {fastifyCors} from "@fastify/cors"
import { getAllPrompts } from './routes/get-all-prompt'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateIdCompletion } from './routes/generate-ai-completion'

const app = fastify()

app.register(fastifyCors, {
  origin: "*"
})
app.register(getAllPrompts)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateIdCompletion)

app.listen({
  port: 3000
}).then(()=>{
  console.log("Server is running!")
})