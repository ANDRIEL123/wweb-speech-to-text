import { RabbitMQServer } from '@andriel123/queue'
import { WwebAudio } from '@andriel123/types'
import { useWwebClient } from '@andriel123/wweb-client'

/**
 * Start a bot
 */
async function startBot() {
    console.log('###### Initialize wweb-bot ######\n')
    const client = await useWwebClient()

    // Initialize rabbitMQ
    const rabbitMQServer = new RabbitMQServer()
    await rabbitMQServer.start(process.env.RABBITMQ_HOST ?? 'localhost', 'transpile_queue')

    client.on('message_create', async (message: any) => {
        // Verify if is audio
        if (message.hasMedia && message.rawData.mimetype.includes('audio')) {
            const audio = await message.downloadMedia()

            const dataToSend: WwebAudio = {
                from: message.from,
                author: message.author,
                to: message.to,
                audioData: {
                    data: audio.data,
                    mimetype: audio.mimetype,
                    filename: audio.filename,
                    filesize: audio.filesize
                }
            }

            // Send serialized audio data to processing queue
            await rabbitMQServer.sendMessageToQueue(JSON.stringify(dataToSend))
        }
    })
}

startBot()