import fs from "fs"
import OpenAI from "openai"
import { createAudioFile, deleteAudioFile } from "./utils"

const openai = new OpenAI()

/**
 * Transform speech to text
 * @returns Transcript text
 */
async function speechToText(base64AudioString: string): Promise<string> {
    const fileName = await createAudioFile(base64AudioString)

    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(fileName),
        model: "whisper-1",
    })

    // Delete temporary audio
    deleteAudioFile(fileName)

    return transcription.text
}

export {
    speechToText
}

