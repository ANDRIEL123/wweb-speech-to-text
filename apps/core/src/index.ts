import { RabbitMQServer } from '@andriel123/queue'
import { WwebAudio } from '@andriel123/types'
import { useWwebClient } from '@andriel123/wweb-client'
import { Client } from 'whatsapp-web.js'
import { speechToText } from './openai/services'

/**
 * This process the transcription on consumer
 * @param messageContent 
 * @param client 
 * @returns 
 */
function callback(messageContent: string, client: Client) {
    console.log('Transform speech to text in progress...')
    return new Promise(async (resolve) => {
        // transform received message a type
        const parsedMessage: WwebAudio = JSON.parse(messageContent) as WwebAudio

        // transcript
        const transcription = await speechToText(parsedMessage.audioData.data)

        // returned to the sender
        await client.sendMessage(parsedMessage.author || parsedMessage.from, transcription)

        resolve(messageContent)
    })
}

async function startCore() {
    console.log('###### Initialize core ######\n')
    const client = await useWwebClient()

    // Initialize RabbitMQ
    const rabbitMQServer = new RabbitMQServer()
    await rabbitMQServer.start(process.env.RABBITMQ_HOST ?? "localhost", 'transpile_queue')

    // Start consume
    await rabbitMQServer.Consume((messageContent) => callback(messageContent, client))
}

startCore()