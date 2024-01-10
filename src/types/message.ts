
export default interface Message {
    _id: string
    user: string
    content: string
    createdAt?: string
    updatedAt?: string
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