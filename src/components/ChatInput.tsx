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
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-white border-t">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan rekomendasi date..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-primary"
            />
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-red-600 transition">
                Kirim
            </button>
        </form>
    )
}

export default ChatInput
