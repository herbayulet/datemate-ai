import {useEffect, useRef} from "react"
import {useChat} from "../context/ChatContext"
import ChatBubble from "./ChatBubble"

const ChatWindow = () => {
    const {state} = useChat()
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"})
    }, [state.messages])
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {state.messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                    <p className="text-lg">👋 Halo! Mau date kemana hari ini?</p>
                    <p className="text-sm mt-2">Ceritakan budget, tipe date, dan kota kamu</p>
                </div>
            ) : (
                state.messages.map((message) => <ChatBubble key={message.id} message={message} />)
            )}

            {state.isLoading && (
                <div className="flex justify-start mb-4">
                    <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-md">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    )
}

export default ChatWindow
