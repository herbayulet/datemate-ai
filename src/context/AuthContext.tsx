import {createContext, useContext, useState} from "react"

interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

interface AuthContextType {
    user: User | null
    isLoggedIn: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock user untuk development
const MOCK_USER: User = {
    id: "1",
    name: "Bayu",
    email: "bayu@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bayu",
}

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)

    const login = () => {
        // TODO: Integrate with Clerk/Auth0
        setUser(MOCK_USER)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context
}
