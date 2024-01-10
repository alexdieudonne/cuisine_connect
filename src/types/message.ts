
export default interface Message {
    user: string
    content: string
    createdAt?: string
    role: 'assistant' | 'user'
}

export interface messageFormSend {
    user: string
    prompt: string
}

export interface sentToGpt {
    content: string
    role: 'assistant' | 'user'
}