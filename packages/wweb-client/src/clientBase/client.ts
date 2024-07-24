import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'

export function useWwebClient(): Promise<Client> {
    return new Promise(async (resolve, reject) => {
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

        await client.initialize()
            .then(() => {
                console.log('Wweb Client initialize')
            })
            .catch((error: any) => {
                console.error(`Client initialize failed ${error}`)
                reject(error)
            })



        client.on('ready', () => {
            console.log('Wweb Client is ready!')
            resolve(client)
        })

        client.on('qr', (qr: any) => {
            qrcode.generate(qr, { small: true })
        })
    })
}