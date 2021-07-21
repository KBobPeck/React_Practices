import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')

  const fetchImage = async () => {
    console.log(page);
    setLoading(true)
    let url;
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setPhotos((oldPhotos) => {
        if (query) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      });
    }
    catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line
  }, [page])


  useEffect(() => {

    const event = window.addEventListener('scroll', () => {
      // console.log(window.innerHeight, window.scrollY, document.body.scrollHeight - 10);
      if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 10) {
        setPage((oldPage) => {
          return oldPage + 1
        })
      }

    })
    return () => window.removeEventListener('scroll', event)
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPhotos([])
    setPage(0)
    fetchImage()
  }

  return <main>
    <section className="search">
      <form className="search-form">
        <input type="text" className="form-input" placeholder='search' value={query} onChange={(e) => { setQuery(e.target.value) }} />
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          <FaSearch />
        </button>
      </form>
    </section>
    <section className="photos">
      <div className="photos-center">
        {photos.map((photo, index) => {
          return <Photo key={index} {...photo} />
        })}
      </div>
      {loading && <h2 className="loading">Loading...</h2>}
    </section>

  </main>
}

export default App
