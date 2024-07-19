import amqp from 'amqplib/callback_api'

/**
 * Se conecta ao RabbitMQ
 * @param host 
 * @returns 
 */
const connectToRabbitMQ = (host: string): Promise<amqp.Connection> => {
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
 * Realiza a conexão TCP/IP entre o cliente e o servidor RabbitMQ
 * @param connection 
 * @returns 
 */
const createChannel = (connection: amqp.Connection): Promise<amqp.Channel> => {
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
 * Envia uma mensagem via protocolo amqp
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
            console.log(` [x] Sent '%s'`, message)
            resolve(message)
        } else {
            reject(new Error('Message was not sent'))
        }
    })
}

/**
 * Cria uma task que se conecta ao RabbitMQ, cria um canal e envia mensagem
 * @param host 
 * @param queue 
 * @param message 
 */
export const taskBase = async (host = 'localhost', queue: string, message: string) => {
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