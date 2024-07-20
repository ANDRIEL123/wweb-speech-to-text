import { Channel, connect, Connection, ConsumeMessage, Message } from 'amqplib';

export default class RabbitMQServer {
    private connection!: Connection;
    private channel!: Channel;

    constructor(uri: string) {
        this.start(uri)
            .then(() => console.log('Initialize connection and channel'))
            .catch(() => console.log('Error connecting to RabbitMQ'))
    }

    async start(uri: string): Promise<void> {
        this.connection = await connect(uri)
        this.channel = await this.connection.createChannel()
    }

    async sendMessageToQueue(queue: string, message: string) {
        return this.channel.sendToQueue(queue, Buffer.from(message))
    }

    async Consume(queue: string, callback: (message: ConsumeMessage | null) => Promise<any>) {
        return this.channel.consume(queue, async (message) => {
            await callback(message)
            this.channel.ack(message as Message)
        })
    }
}