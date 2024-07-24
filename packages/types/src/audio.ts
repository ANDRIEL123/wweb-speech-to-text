import { MessageMedia } from "whatsapp-web.js"

type WwebAudio = {
    from: string,
    to: string,
    author: string,
    audioData: MessageMedia
}

export { WwebAudio }

