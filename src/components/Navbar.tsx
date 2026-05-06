import {Link} from "react-router-dom"

export default function Navbar() {
    const isLoggedIn = false // TODO: ganti dengan auth state

    return (
        <nav className="bg-rose-500 text-white px-4 py-3">
            <div className="max-w-3xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold flex items-center gap-2">
                    <span>🌹</span> HyungDate AI
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/chat" className="text-sm hover:text-rose-100">
                        Chat
                    </Link>
                    {isLoggedIn ? (
                        <Link to="/profile" className="text-sm hover:text-rose-100">
                            Profile
                        </Link>
                    ) : (
                        <button className="text-sm bg-white text-rose-500 px-3 py-1 rounded-full hover:bg-rose-50">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}
