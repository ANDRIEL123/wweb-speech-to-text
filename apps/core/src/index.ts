import { worker } from '@andriel123/queue'

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

worker('task_queue', 'localhost', (messageContent) => callback(messageContent))