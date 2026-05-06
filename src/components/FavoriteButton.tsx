import {useState} from "react"

interface FavoriteButtonProps {
    placeId: string
    isInitiallySaved?: boolean
    onToggle?: (saved: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FavoriteButton({placeId, isInitiallySaved = false, onToggle}: FavoriteButtonProps) {
    const [isSaved, setIsSaved] = useState(isInitiallySaved)
    const [isLoading, setIsLoading] = useState(false)

    const handleToggle = async () => {
        setIsLoading(true)

        // TODO: Call API to save/unsave
        // const response = await fetch(`/api/favorites/${placeId}`, {
        //   method: isSaved ? 'DELETE' : 'POST'
        // })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300))

        const newSaved = !isSaved
        setIsSaved(newSaved)
        onToggle?.(newSaved)
        setIsLoading(false)
    }

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
        p-2 rounded-full transition-all
        ${isSaved ? "bg-rose-100 text-rose-500 hover:bg-rose-200" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}
        ${isLoading ? "opacity-50" : ""}
      `}
            title={isSaved ? "Hapus dari favorit" : "Simpan ke favorit"}>
            <span className="text-lg">{isSaved ? "❤️" : "🤍"}</span>
        </button>
    )
}
