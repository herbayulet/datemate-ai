interface FilterBarProps {
  budget: string
  city: string
  occasion: string
  onBudgetChange: (value: string) => void
  onCityChange: (value: string) => void
  onOccasionChange: (value: string) => void
}

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

export default function FilterBar({ 
  budget, city, occasion, 
  onBudgetChange, onCityChange, onOccasionChange 
}: FilterBarProps) {
  return (
    <div className="p-3 space-y-2 bg-gray-50 border-b">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <span className="text-xs text-gray-500 shrink-0 py-1">Budget:</span>
        {budgets.map((b) => (
          <button
            key={b.value}
            onClick={() => onBudgetChange(budget === b.value ? '' : b.value)}
            className={`px-3 py-1 rounded-full text-xs border transition shrink-0 ${
              budget === b.value
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Kota (contoh: Jakarta)"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          className="flex-1 px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:border-rose-500"
        />
        <select
          value={occasion}
          onChange={(e) => onOccasionChange(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:border-rose-500 bg-white"
        >
          <option value="">Occasion</option>
          {occasions.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}