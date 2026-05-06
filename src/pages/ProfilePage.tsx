const ProfilePage = () => {
  const favorites = [] // TODO: fetch dari API

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tempat Favoritmu</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <div className="text-4xl mb-4">💾</div>
          <p>Belum ada tempat favorit</p>
          <p className="text-sm">Chat dengan AI dan simpan tempat yang kamu suka!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {/* Favorite cards */}
        </div>
      )}
    </div>
  )
}

export default ProfilePage