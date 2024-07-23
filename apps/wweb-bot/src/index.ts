import { RabbitMQServer } from '@andriel123/queue';
import fs from 'fs';
import { clientBase } from './clientBase/client';

/**
 * Start a bot
 */
function startBot() {
    console.log('###### Initialize wweb-bot ######\n')
    const client = clientBase()

    // Initialize rabbitMQ
    const rabbitMQServer = new RabbitMQServer()
    rabbitMQServer.start('localhost', 'transpile_queue')

    client.on('message_create', async (message: any) => {
        // Verify if is audio
        if (message.hasMedia && message.rawData.mimetype.includes('audio')) {
            const audio = await message.downloadMedia()

            // await rabbitMQServer.sendMessageToQueue(audio.data)

            // Save local audio
            fs.writeFileSync("audio.ogg", audio.data, { encoding: 'base64' });
        }
    })
}

startBot()


