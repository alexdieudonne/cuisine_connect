import message from "./message";

export default interface conversation {
    messages: message[]
    lastTopic: string
}