import type {Message} from "../types"

interface ChatBubbleProps {
    message: Message
}

const ChatBubble = ({message}: ChatBubbleProps) => {
    const isUser = message.role === "user"

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`max-w-[70%] rounded-2xl px-4 py-2${isUser ? "bg-primary text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-md"}`}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                    {message.timeStamp.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        </div>
    )
}

export default ChatBubble
