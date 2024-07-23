import { Channel, Connection } from 'amqplib/callback_api';
import { connectToRabbitMQ, createChannel, declareQueue } from './utils';

export default class RabbitMQServer {
    private connection!: Connection;
    private channel!: Channel;
    private _queue: string = "";

    constructor() { }

    async start(uri: string, queue: string): Promise<void> {
        this._queue = queue;
        this.connection = await connectToRabbitMQ(uri)
        this.channel = await createChannel(this.connection)
        await declareQueue(this.channel, queue)

        this.channel.prefetch(1)
    }

    async sendMessageToQueue(message: string) {
        console.log(`Send message ${message} to queue ${this._queue}`)

        return this.channel.sendToQueue(this._queue, Buffer.from(message))
    }

    async Consume(callback: (messageContent: string) => Promise<any>) {
        console.log(`Start Consumer on queue ${this._queue}...`)

        return this.channel.consume(this._queue, async (message) => {
            if (!message) {
                console.log('Problema on received a message')
                return
            }

            const messageContent = message?.content.toString()
            console.log(`[v] Received: ${messageContent}`)

            await callback(messageContent)
            console.log('[x] Done')
            this.channel.ack(message)
        })
    }
}