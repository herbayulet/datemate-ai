import {BrowserRouter, Routes, Route} from "react-router-dom"
import {ChatProvider} from "./context/ChatContext"
import {AuthProvider} from "./context/AuthContext"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ChatProvider>
                    <div className="min-h-screen bg-gray-50">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </Routes>
                    </div>
                </ChatProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
