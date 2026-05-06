import {useEffect, useRef} from "react"
import {useChat} from "../context/ChatContext"
import ChatBubble from "./ChatBubble"

const ChatWindow = () => {
    const {state} = useChat()
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"})
    }, [state.messages, state.isLoading])

    return (
        <div className="h-full overflow-y-auto p-4">
            {state.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    {/* <div className="text-6xl mb-4">💑</div> */}
                    <p className="text-lg font-medium text-gray-600">Halo! Mau date kemana hari ini?</p>
                    <p className="text-sm mt-2">Ceritakan budget, tipe date, dan kota kamu</p>
                    <div className="mt-6 flex gap-2 flex-wrap justify-center">
                        <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs">Romantis</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Adventurous</span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">Chill</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">Food</span>
                    </div>
                </div>
            ) : (
                <div className="space-y-2 pb-4">
                    {state.messages.map((message) => (
                        <ChatBubble key={message.id} message={message} />
                    ))}

                    {state.isLoading && (
                        <div className="flex justify-start mb-4">
                            <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-md border">
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
            )}
        </div>
    )
}

export default ChatWindow
