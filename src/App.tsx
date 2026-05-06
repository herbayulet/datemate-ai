import {BrowserRouter, Routes, Route} from "react-router-dom"
import {ChatProvider} from "./context/ChatContext"
import LandingPage from "./pages/LandingPage"
import Navbar from "./components/Navbar"
import ProfilePage from "./pages/ProfilePage"

function App() {
    return (
        <BrowserRouter>
            <ChatProvider>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </div>
            </ChatProvider>
        </BrowserRouter>
    )
}

export default App
