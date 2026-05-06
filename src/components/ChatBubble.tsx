import type {Message} from "../types"

interface ChatBubbleProps {
    message: Message
}

const ChatBubble = ({message}: ChatBubbleProps) => {
    const isUser = message.role === "user"

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`
        max-w-[70%] rounded-2xl px-4 py-3
        ${isUser ? "bg-rose-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-md border"}
      `}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className={`text-xs mt-1 block ${isUser ? "text-rose-100" : "text-gray-400"}`}>
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
