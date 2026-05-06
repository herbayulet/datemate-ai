import {useState, type FormEvent} from "react"
import {useChat} from "../context/ChatContext"
import type { Message } from "../types"

function createMessage(content: string, role: "user" | "assistant"): Message {
    return {
        id: crypto.randomUUID(),
        role,
        content,
        timeStamp: new Date(),
    }
}

export default function ChatInput() {
    const [input, setInput] = useState("")
    const {dispatch} = useChat()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        dispatch({
            type: "SEND_MESSAGE",
            payload: createMessage(input.trim(), "user"),
        })

        setInput("")
        dispatch({type: "SET_LOADING", payload: true})

        setTimeout(() => {
            dispatch({
                type: "RECEIVE_MESSAGE",
                payload: createMessage(
                    `Oke, aku catat: "${input.trim()}". Nanti aku kasih rekomendasi date yang cocok!`,
                    "assistant",
                ),
            })
            dispatch({type: "SET_LOADING", payload: false})
        }, 1500)
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-white border-t">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan rekomendasi date..."
                className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all text-sm"
            />
            <button
                type="submit"
                disabled={!input.trim()}
                className="px-5 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm">
                Kirim
            </button>
        </form>
    )
}
