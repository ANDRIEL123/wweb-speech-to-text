import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'

export function clientBase() {
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

    return client
}