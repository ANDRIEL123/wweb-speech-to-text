import fs from 'fs';
import { Readable } from "stream";

/**
 * Cria arquivo de áudio temporário
 * @param base64AudioString 
 * @returns 
 */
export function createAudioFile(base64AudioString: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // Decodifica a string base64 em um Buffer
        const buffer = Buffer.from(base64AudioString, 'base64');

        const readStream = new Readable()
        readStream._read = () => { } // _read é necessário, mas pode ser uma função vazia
        readStream.push(buffer)
        readStream.push(null) // Sem mais dados a serem enviados

        const fileName = 'tempAudioFile.mp3'

        const writeStream = fs.createWriteStream(fileName)

        // Encadeia os eventos de 'finish' e 'error'
        readStream.pipe(writeStream)

        writeStream.on('finish', () => {
            resolve(fileName)
        })

        writeStream.on('error', (err) => {
            reject(`Error when creating temporary audio file ${err}`)
        })
    })
}

/**
 * Deleta arquivo de áudio temporário
 * @param filePath 
 */
export function deleteAudioFile(filePath: string) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error on deleting temporary file: ${err}`)
        }
    })
}