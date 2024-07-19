import amqp from 'amqplib/callback_api'

export function worker(queue: string, host: string, process: (msgContent: string) => void) {
    console.log(`Iniciando Worker para a queue ${queue}...`)
    amqp.connect(`amqp://${host}`, function (error0, connection) {
        if (error0) {
            throw error0
        }

        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1
            }

            // This makes sure the queue is declared before attempting to consume from it
            channel.assertQueue(queue, {
                durable: true
            })

            channel.consume(queue, function (msg) {
                if (!msg) {
                    console.log("Not received a message.")
                    return
                }

                const msgContent = msg?.content.toString()

                console.log(" [x] Received %s", msgContent)

                // Execute the process
                process(msgContent)
            }, {
                noAck: false
            })
        })
    })
}