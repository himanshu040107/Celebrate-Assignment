import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import Cards from './Cards'
import Navbar from './Navbar'
import useFetchPhotos from '../hooks/useFetchPhotos'

const loadFavourites = () => {
  try {
    const savedFavourites = JSON.parse(localStorage.getItem('photo-gallery-favourites') || '[]')
    return Array.isArray(savedFavourites) ? savedFavourites : []
  } catch {
    return []
  }
}

const favouritesReducer = (favourites, action) => {
  switch (action.type) {
    case 'toggle':
      return favourites.includes(action.id)
        ? favourites.filter((id) => id !== action.id)
        : [...favourites, action.id]
    default:
      return favourites
  }
}

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos()
  const [searchTerm, setSearchTerm] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, loadFavourites)

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return photos.filter((photo) => photo.author.toLowerCase().includes(query))
  }, [photos, searchTerm])

  useEffect(() => {
    localStorage.setItem('photo-gallery-favourites', JSON.stringify(favourites))
  }, [favourites])

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="mt-4">
        {loading && <p className="font-mono text-[#58684c]">Loading photos...</p>}
        {error && <p className="font-mono text-red-700">Could not load photos. Please try again later.</p>}
        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="font-mono text-[#58684c]">No photos found.</p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <Cards
                key={photo.id}
                id={photo.id}
                photoURL={photo.download_url}
                author={photo.author}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={() => dispatch({ type: 'toggle', id: photo.id })}
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default Gallery
