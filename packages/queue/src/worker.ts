import amqp from 'amqplib/callback_api';

/**
 * Consumer to received and process messages
 * @param queue 
 * @param host 
 * @param callback 
 */
export function worker(queue: string, host: string, callback: (messageContent: string) => Promise<any>) {
    amqp.connect(`amqp://${host}`, function (error0, connection) {
        if (error0) {
            throw error0;
        }

        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1
            }

            // Declaring queue before start the consume
            channel.assertQueue(queue, {
                durable: true
            })

            channel.prefetch(1)

            console.log(`Initialized consumer to the queue ${queue}...`);

            channel.consume(queue, async function (msg) {
                if (!msg) {
                    console.log("Error receiving a message.");
                    return;
                }

                const msgContent = msg.content.toString();

                console.log(" [x] Received %s", msgContent);

                try {
                    // Execute callback
                    await callback(msgContent)

                    console.log(" [x] Done")

                    channel.ack(msg)
                } catch (error) {
                    console.error("Error on processing a message:", error);
                    // `channel.nack(msg)` to resend to the queue
                }
            }, {
                noAck: false
            })
        })
    })
}
