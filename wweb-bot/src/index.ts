const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const fs = require('fs')

const client = new Client({
    puppeteer: {
        executablePath: process.env.CHROME_BIN || undefined,
        browserWSEndpoint: process.env.CHROME_WS || undefined,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
    authStrategy: new LocalAuth()
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message_create', async (message: any) => {
    // Verify if is audio
    if (message.hasMedia) {
        const audio = await message.downloadMedia()

        // Save local audio
        fs.writeFileSync("audio.ogg", audio.data, { encoding: 'base64' });
    }

    // Test return msg
    //if (msgContent === 'Oi') {
    //    client.sendMessage(message.from, 'Olá')
    // }
})

client.on('qr', (qr: any) => {
    qrcode.generate(qr, { small: true })
})

client.initialize()
    .then(() => {
        console.log('Client initialize')
    })
    .catch((res: any) => {
        console.error(`Client initialize failed ${res}`)
    })


