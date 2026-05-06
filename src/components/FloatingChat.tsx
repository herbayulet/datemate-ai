import { useState } from 'react'
import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'

const budgets = [
  { value: '50000', label: '< 50rb' },
  { value: '100000', label: '50-100rb' },
  { value: '200000', label: '100-200rb' },
  { value: '500000', label: '200-500rb' },
  { value: '1000000', label: '500rb+' },
]

const occasions = [
  { id: 'first-date', label: 'First Date' },
  { id: 'anniversary', label: 'Anniversary' },
  { id: 'casual', label: 'Casual' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'proposal', label: 'Proposal' },
]

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [budget, setBudget] = useState('')
  const [city, setCity] = useState('')
  const [occasion, setOccasion] = useState('')

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-rose-500 text-white
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300
          ${isOpen ? 'rotate-45 scale-0' : 'rotate-0 scale-100'}
        `}
      >
        <span className="text-2xl">💬</span>
      </button>

      {/* Close Button (when open) */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gray-800 text-white shadow-lg flex items-center justify-center transition-all"
        >
          <span className="text-2xl">✕</span>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className={`
          fixed z-40
          bg-white shadow-2xl overflow-hidden
          flex flex-col
          transition-all duration-300
          /* Mobile: full screen from bottom */
          inset-x-0 bottom-0 h-[85vh] rounded-t-3xl
          /* Desktop: floating panel */
          md:right-6 md:left-auto md:bottom-24 md:w-100 md:h-150 md:rounded-2xl
        `}>
          {/* Header */}
          <div className="bg-rose-500 text-white p-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌹</span>
              <div>
                <h3 className="font-bold">HyungMate AI</h3>
                <p className="text-xs text-rose-100">Rekomendasi date terbaik</p>
              </div>
            </div>
          </div>

          {/* Filter Bar (inside chat) */}
          <div className="border-b p-3 space-y-2 shrink-0 bg-gray-50">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {budgets.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBudget(b.value)}
                  className={`px-3 py-1 rounded-full text-xs border transition shrink-0 ${
                    budget === b.value
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Kota..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:border-rose-500"
              />
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:border-rose-500 bg-white"
              >
                <option value="">Occasion</option>
                {occasions.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-hidden">
            <ChatWindow />
          </div>
          
          <ChatInput />
        </div>
      )}
    </>
  )
}