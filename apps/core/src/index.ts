import { worker } from '@andriel123/queue'

worker('task_queue', 'localhost', () => console.log('Testando 1234'))