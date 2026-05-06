import {useCallback, useEffect, useState} from "react"
import ChatInput from "./ChatInput"
import type {DatePlan} from "../types"
import FilterBar from "./FIlterbar"
import PlaceCard from "./PlaceCard"
import ChatWindow from "./ChatWindow"

const MOCK_RECOMMENDATIONS: DatePlan[] = [
    {
        id: "1",
        title: "Kopi Nako Dago",
        description:
            "Cafe cozy dengan view pegunungan, perfect untuk chill date. Wifi kencang, cocok untuk kerja sambil nunggu.",
        budget: 80000,
        type: "chill",
        location: "Bandung",
        duration: "2-3 jam",
    },
    {
        id: "2",
        title: "Taman Hutan Raya Ir. H. Djuanda",
        description: "Jalan-jalan di taman hutan dengan udara sejuk. Ada jembatan gantung dan gua Jepang.",
        budget: 50000,
        type: "outdoor",
        location: "Bandung",
        duration: "3-4 jam",
    },
    {
        id: "3",
        title: "The Lodge Maribaya",
        description: "Spot foto Instagrammable dengan hammock dan hot air balloon. Entry fee murah.",
        budget: 100000,
        type: "adventurous",
        location: "Lembang",
        duration: "2-3 jam",
    },
]

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [budget, setBudget] = useState("")
    const [city, setCity] = useState("")
    const [occasion, setOccasion] = useState("")
    const [recommendations, setRecommendations] = useState<DatePlan[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Function untuk fetch recommendations dari backend
    const fetchRecommendations = useCallback(async () => {
        setIsLoading(true)

        try {
            // TODO: Ganti dengan API call ke backend
            // const response = await fetch('http://localhost:3001/api/chat', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ budget, city, occasion })
            // })
            // const data = await response.json()
            // setRecommendations(data.recommendations)

            // Mock: filter berdasarkan budget
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const filtered = MOCK_RECOMMENDATIONS.filter((plan) => {
                if (!budget) return true
                const budgetNum = parseInt(budget)
                if (budgetNum <= 100000) return plan.budget <= 100000
                if (budgetNum <= 300000) return plan.budget <= 300000
                return true
            })

            setRecommendations(filtered)
        } catch (error) {
            console.error("Error fetching recommendations:", error)
        } finally {
            setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [budget, city, occasion])

    useEffect(() => {
        if (budget || city || occasion) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchRecommendations()
        }
    }, [budget, city, occasion, fetchRecommendations])

    return (
        <>
            {/* ========================================== */}
            {/* TOMBOL FLOATING — DI LUAR CHAT PANEL */}
            {/* ========================================== */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          fixed ${isOpen ? "bottom-20" : "bottom-6"} right-6 z-60
          w-14 h-14 rounded-full
          ${isOpen ? "bg-gray-800" : "bg-rose-500"}
          text-white shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300
          ${isOpen ? "rotate-90" : "rotate-0"}
        `}>
                <span className="text-2xl">{isOpen ? "✕" : "💬"}</span>
            </button>

            {/* ========================================== */}
            {/* CHAT PANEL — MUNCUL KALAU isOpen = true */}
            {/* ========================================== */}
            {isOpen && (
                <div
                    className={`
          fixed z-50
          bg-white shadow-2xl overflow-hidden flex flex-col
          transition-all duration-300
          /* Mobile: full width dari bawah */
          inset-x-0 bottom-0 h-[85vh] rounded-t-3xl
          /* Desktop: floating panel */
          md:right-6 md:left-auto md:bottom-24 md:w-105 md:h-150 md:rounded-2xl
        `}>
                    {/* Header */}
                    <div className="bg-rose-500 text-white p-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🌹</span>
                            <div>
                                <h3 className="font-bold">DateMate AI</h3>
                                <p className="text-xs text-rose-100">Rekomendasi date terbaik</p>
                            </div>
                        </div>
                    </div>

                    {/* Filter */}
                    <FilterBar
                        budget={budget}
                        city={city}
                        occasion={occasion}
                        onBudgetChange={(val) => {
                            setBudget(val)
                            fetchRecommendations()
                        }}
                        onCityChange={(val) => {
                            setCity(val)
                            fetchRecommendations()
                        }}
                        onOccasionChange={(val) => {
                            setOccasion(val)
                            fetchRecommendations()
                        }}
                    />

                    {/* Chat + Recommendations */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-y-auto scrollbar-hide p-3">
                            {/* Welcome message kalau belum ada filter */}
                            {!budget && !city && !occasion && (
                                <div className="text-center text-gray-400 py-8">
                                    <div className="text-4xl mb-3">👋</div>
                                    <p className="text-sm">Pilih budget, kota, dan occasion</p>
                                    <p className="text-xs mt-1">AI akan carikan tempat date terbaik!</p>
                                </div>
                            )}

                            {/* Loading */}
                            {isLoading && (
                                <div className="flex justify-center py-4">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-100" />
                                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}

                            {/* Recommendations */}
                            {!isLoading &&
                                recommendations.map((plan) => (
                                    <PlaceCard
                                        key={plan.id}
                                        plan={plan}
                                        onSave={() => console.log("Save", plan.id)}
                                        onDetail={() => console.log("Detail", plan.id)}
                                    />
                                ))}

                            {/* Chat messages */}
                            <ChatWindow />
                        </div>
                    </div>

                    <ChatInput />
                </div>
            )}
        </>
    )
}
