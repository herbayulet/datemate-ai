import {ChatProvider} from "./context/ChatContext"
import ChatWindow from "./components/ChatWindow"
import ChatInput from "./components/ChatInput"

function App() {
    return (
        <ChatProvider>
            <div className="h-screen flex flex-col bg-background">
                {/* Header */}
                <header className="bg-primary text-white p-4 shadow-lg">
                    <h1 className="text-xl font-bold">DateMate AI</h1>
                    <p className="text-xs opacity-80">Plan your perfect date</p>
                </header>

                {/* Chat Window */}
                <ChatWindow />

                {/* Input */}
                <ChatInput />
            </div>
        </ChatProvider>
    )
}

export default App
