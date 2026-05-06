import {useState, type FormEvent} from "react"
import {useChat} from "../context/ChatContext"

const ChatInput = () => {
    const [input, setInput] = useState("")
    const {dispatch} = useChat()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        // Dispatch SEND_MESSAGE
        dispatch({
            type: "SEND_MESSAGE",
            payload: {
                id: crypto.randomUUID(),
                role: "user",
                content: input.trim(),
                timeStamp: new Date(),
            },
        })

        // Clear input
        setInput("")

        // TODO: Nanti di sini kita akan kirim ke API dan terima response AI
        // Untuk sekarang, kita simulate AI response setelah 1 detik
        setTimeout(() => {
            dispatch({
                type: "RECEIVE_MESSAGE",
                payload: {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: `Oke, aku catat: "${input.trim()}". Nanti aku akan kasih rekomendasi date yang cocok!`,
                    timeStamp: new Date(),
                },
            })
        }, 1000)

        // Set loading true
        dispatch({type: "SET_LOADING", payload: true})
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-3 p-4 bg-white border-t shadow-lg">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan rekomendasi date..."
                className="flex-1 px-5 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all text-sm"
            />
            <button
                type="submit"
                disabled={!input.trim()}
                className="px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm whitespace-nowrap">
                Kirim
            </button>
        </form>
    )
}

export default ChatInput
