import amqp from 'amqplib/callback_api';

export function syncTask(host: string, queue: string, msg: string) {
    amqp.connect(`amqp://${host}`, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1
            }

            channel.assertQueue(queue, {
                durable: true
            })

            channel.sendToQueue(queue, Buffer.from(msg), {
                persistent: true
            })

            console.log(" [x] Sent '%s'", msg);
        })

        setTimeout(function () {
            connection.close()
        }, 500)
    })
}