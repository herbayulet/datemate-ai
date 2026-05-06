import type { DatePlan } from "../types"

interface PlaceCardProps {
    plan: DatePlan
    onSave?: () => void
    onDetail?: () => void
    isSaved?: boolean
}

export default function PlaceCard({plan, onSave, onDetail, isSaved}: PlaceCardProps) {
    const budgetColor =
        plan.budget < 100000
            ? "bg-green-100 text-green-700"
            : plan.budget < 300000
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"

    const budgetLabel = plan.budget < 100000 ? "Terjangkau" : plan.budget < 300000 ? "Sedang" : "Premium"

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-3 hover:shadow-md transition-shadow">
            <div className="h-24 bg-linear-to-br from-rose-100 to-pink-50 flex items-center justify-center">
                <span className="text-3xl">📍</span>
            </div>

            <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-gray-800">{plan.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${budgetColor}`}>{budgetLabel}</span>
                </div>

                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{plan.description}</p>

                <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
                    <span>📍 {plan.location}</span>
                    <span>•</span>
                    <span>⏱️ {plan.duration}</span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onDetail}
                        className="flex-1 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-medium hover:bg-rose-600 transition">
                        Lihat Detail
                    </button>
                    {onSave && (
                        <button
                            onClick={onSave}
                            className={`px-3 py-1.5 border rounded-lg text-xs transition ${
                                isSaved
                                    ? "bg-rose-50 border-rose-200 text-rose-500"
                                    : "border-gray-200 hover:bg-gray-50"
                            }`}>
                            {isSaved ? "❤️" : "🤍"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
