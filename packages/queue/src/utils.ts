import amqp from 'amqplib/callback_api'

/**
 * Connect to RabbitMQ
 * @param host 
 * @returns 
 */
export const connectToRabbitMQ = (host: string): Promise<amqp.Connection> => {
    return new Promise((resolve, reject) => {
        amqp.connect(`amqp://${host}`, (error, connection) => {
            if (error) {
                reject(error)
            } else {
                resolve(connection)
            }
        })
    })
}

/**
 * This makes sure the queue is declared before attempting to consume from it
 * @param channel 
 * @param queue 
 */
export const declareQueue = (channel: amqp.Channel, queue: string) => {
    return new Promise((resolve) => {
        channel.assertQueue(queue, { durable: true })
        resolve(queue)
    })
}

/**
 * Performs the TCP/IP connection between the client and the RabbitMQ server
 * @param connection 
 * @returns 
 */
export const createChannel = (connection: amqp.Connection): Promise<amqp.Channel> => {
    return new Promise((resolve, reject) => {
        connection.createChannel((error: any, channel: amqp.Channel) => {
            if (error) {
                reject(error)
            } else {
                resolve(channel)
            }
        })
    })
}

/**
 * Send a message via amqp protocol
 * @param channel 
 * @param queue 
 * @param message 
 * @returns 
 */
const sendMessage = (channel: amqp.Channel, queue: string, message: string) => {
    return new Promise((resolve, reject) => {
        channel.assertQueue(queue, { durable: true })
        const wasSent = channel.sendToQueue(queue, Buffer.from(message), { persistent: true })
        if (wasSent) {
            console.log(` [x] Sent '%s' to queue ${queue}`, message)
            resolve(message)
        } else {
            reject(new Error('Message was not sent'))
        }
    })
}

/**
 * Create a task that connects to RabbitMQ, creates a channel and sends a message
 * @param host 
 * @param queue 
 * @param message 
 */
export const asyncTask = async (host = 'localhost', queue: string, message: string) => {
    let connection

    try {
        connection = await connectToRabbitMQ(host)
        const channel = await createChannel(connection)
        await sendMessage(channel, queue, message)
    } catch (error) {
        console.error('Error:', error)
        throw error
    } finally {
        if (connection) {
            connection.close()
        }
    }
}