
export default interface message {
    user: string
    content: string
    createdAt?: string
    role: 'assistant' | 'user'
}

export interface messageFormSend {
    user: string
    messages?: message[]
    prompt: string
}

export interface sentToGpt {
    content: string
    role: 'assistant' | 'user'
}