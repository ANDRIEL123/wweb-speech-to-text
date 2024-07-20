import { syncTask } from '@andriel123/queue';
import { clientBase } from './clientBase/client';

/**
 * Start a bot
 */
function start() {
    const client = clientBase()

    client.on('message_create', async (message: any) => {
        syncTask('localhost', 'task_queue', 'Olá mundo')

        // Verify if is audio
        if (message.hasMedia && message.rawData.mimetype.includes('audio')) {
            const audio = await message.downloadMedia()

            // Save local audio
            // fs.writeFileSync("audio.ogg", audio.data, { encoding: 'base64' });

            // await taskBase("localhost", "task_queue", "Testando queue")
        }

        // Test return msg
        //if (msgContent === 'Oi') {
        //    client.sendMessage(message.from, 'Olá')
        // }
    })
}

start()


