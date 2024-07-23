import { RabbitMQServer } from '@andriel123/queue'

function callback(messageContent: string) {
    console.log('iniciando processamento da task, conteúdo: ', messageContent)
    return new Promise((resolve) => {
        // Process the task
        setTimeout(() => {
            console.log('rodou task')
            resolve(messageContent)
        }, 5000)
    })
}

async function startCore() {
    console.log('###### Initialize core ######\n')
    const rabbitMQServer = new RabbitMQServer()

    await rabbitMQServer.start("localhost", 'transpile_queue')
    await rabbitMQServer.Consume((messageContent) => callback(messageContent))
}

startCore()