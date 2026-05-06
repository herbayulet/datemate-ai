import FloatingChat from '../components/FloatingChat'

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto py-12 text-center">
        {/* <div className="text-6xl mb-6">💑</div> */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bingung Mau Date Kemana?
        </h1>
        <p className="text-gray-600 mb-8">
          Ceritakan budget, kota, dan occasion-mu. AI kami akan kasih rekomendasi date terbaik!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 mt-2">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm font-medium">Pilih Budget</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-2xl mb-2">📍</div>
            <div className="text-sm font-medium">Pilih Kota</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-2xl mb-2">🎉</div>
            <div className="text-sm font-medium">Pilih Occasion</div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          Klik tombol chat di pojok kanan bawah untuk mulai!
        </p>
      </div>

      {/* Floating Chat */}
      <FloatingChat />
    </div>
  )
}