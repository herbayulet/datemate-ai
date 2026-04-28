import {createContext, useContext, useReducer} from "react"
import type {ChatState, DatePlan, Message} from "../types"

/* initial state */
const initialState: ChatState = {
    messages: [],
    isLoading: false,
    currentPlan: null,
}

/* action types */
type ChatAction =
    | {type: "SEND_MESSAGE"; payload: Message}
    | {type: "RECEIVE_MESSAGE"; payload: Message}
    | {type: "SET_LOADING"; payload: boolean}
    | {type: "SET_PLAN"; payload: DatePlan}

/* reducer */
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
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

/* context type */
interface ChatContextType {
    state: ChatState
    dispatch: React.Dispatch<ChatAction>
}

/* context */
const ChatContext = createContext<ChatContextType | null>(null)

/* provider component */
export const ChatProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(chatReducer, initialState)

    return <ChatContext.Provider value={{state, dispatch}}>{children}</ChatContext.Provider>
}

/* hook */
// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
    const context = useContext(ChatContext)
    if (!context) throw new Error("useChat must be used inside ChatProvider")
    return context
}
