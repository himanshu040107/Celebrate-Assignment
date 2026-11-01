import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://picsum.photos/v2/list?limit=30')
        if (isMounted) setPhotos(response.data)
      } catch (fetchError) {
        if (isMounted) setError(fetchError)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPhotos()
    return () => { isMounted = false }
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos
