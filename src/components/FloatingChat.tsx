import {useState} from "react"
import ChatWindow from "./ChatWindow"
import ChatInput from "./ChatInput"
import PlaceCard from "./PlaceCard"
import type { DatePlan } from "../types"
import FilterBar from "./FIlterbar"

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [budget, setBudget] = useState("")
    const [city, setCity] = useState("")
    const [occasion, setOccasion] = useState("")
    const [recommendations] = useState<DatePlan[]>([])

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          ${isOpen ? "bg-gray-800 rotate-45" : "bg-rose-500 rotate-0"}
          text-white shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300
        `}>
                <span className="text-2xl">{isOpen ? "✕" : "💬"}</span>
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div
                    className={`
          fixed z-40 bg-white shadow-2xl overflow-hidden flex flex-col
          transition-all duration-300
          inset-x-0 bottom-0 h-[85vh] rounded-t-3xl
          md:right-6 md:left-auto md:bottom-24 md:w-[420px] md:h-[600px] md:rounded-2xl
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
                        onBudgetChange={setBudget}
                        onCityChange={setCity}
                        onOccasionChange={setOccasion}
                    />

                    {/* Chat + Recommendations */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-y-auto scrollbar-hide p-3">
                            <ChatWindow />

                            {/* Place Cards */}
                            {recommendations.map((plan) => (
                                <PlaceCard
                                    key={plan.id}
                                    plan={plan}
                                    onSave={() => console.log("Save", plan.id)}
                                    onDetail={() => console.log("Detail", plan.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <ChatInput />
                </div>
            )}
        </>
    )
}
