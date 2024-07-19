import { taskBase } from '@andriel123/queue';
import fs from 'fs';
import { clientBase } from './clientBase/client';

/**
 * Start a bot
 */
function start() {
    const client = clientBase()

    client.on('message_create', async (message: any) => {
        // Verify if is audio
        if (message.hasMedia && message.rawData.mimetype.includes('audio')) {
            const audio = await message.downloadMedia()

            // Save local audio
            fs.writeFileSync("audio.ogg", audio.data, { encoding: 'base64' });

            await taskBase("localhost", "task_queue", "Testando queue")
        }

        // Test return msg
        //if (msgContent === 'Oi') {
        //    client.sendMessage(message.from, 'Olá')
        // }
    })
}

start()


