import {createContext, useContext, useReducer, type ReactNode} from "react"
import type { ChatState, DatePlan, Message } from "../types";

// Initial state
const initialState: ChatState = {
    messages: [],
    isLoading: false,
    currentPlan: null,
}

// Action types — HARUS ADA 4 INI
type ChatAction =
    | {type: "SEND_MESSAGE"; payload: Message}
    | {type: "RECEIVE_MESSAGE"; payload: Message}
    | {type: "SET_LOADING"; payload: boolean}
    | {type: "SET_PLAN"; payload: DatePlan}

// Reducer — HARUS HANDLE 4 CASE
function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload],
                isLoading: false,
            }
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload,
            }
        case "SET_PLAN":
            return {
                ...state,
                currentPlan: action.payload,
            }
        default:
            return state
    }
}

// Context type
interface ChatContextType {
    state: ChatState
    dispatch: React.Dispatch<ChatAction>
}

// Create Context
const ChatContext = createContext<ChatContextType | null>(null)

// Provider
export function ChatProvider({children}: {children: ReactNode}) {
    const [state, dispatch] = useReducer(chatReducer, initialState)

    return <ChatContext.Provider value={{state, dispatch}}>{children}</ChatContext.Provider>
}

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChat must be used inside ChatProvider")
    }
    return context
}
