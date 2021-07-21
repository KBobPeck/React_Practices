import React, { useState, useEffect } from 'react';
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const useFetch = (url) => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [data, setData] = useState(null)

  const fetchMovies = async (url) => {
    setLoading(true)
    try {
      const response = await fetch(url);
      const data = await response.json()

      if (data.Response === 'True') {
        setData(data.Search || data)
        setError({ show: false, msg: '' })
      }

      else {
        console.log(error);
        setError({ show: true, msg: data.Error })
      }
      
      setLoading(false)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${url}`)
  }, [url])

  return ({data, error, loading})
}

export default useFetch
