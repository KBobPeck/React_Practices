import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)

  const [requests, setRequests] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ show: false, msg: '' })

  const checkRequests = async () => {
    const response = await fetch(`${rootUrl}/rate_limit`)
    const data = await response.json()
    console.log(data);
    if (data.rate.remaining > 0) {
      setRequests(data.rate.remaining)
    } else {
      setError({ show: true, msg: 'no more requests available' })
    }
  }

  //~~~~~~~~~~~~~~~~~~~~~Different way of doing the fetch using Axios library ~~~~~~~~~~~~
  // const toggleError = (show = false, msg = '') => { setError(`show:${show}, msg:${msg}`) }
  // const searchGithubUser = async (user) => {
  //   toggleError();
  //   setLoading(true)
  //   const response = await axios(`${rootUrl}/users/${user}`)
  //     .catch((err) => console.log(err))
  //   if(response) { 
  //     setGithubUser(response.data);
  //     const {login, repos_url, followers_url} = response.data;

  //     await Promise.allSettled([
  //       axios(`${repos_url}?per_page=100`), 
  //       axios(`${followers_url}?per_page=100`),
  //     ]).then((results) => {
  //       const [repos, followers] = results
  //       const status = 'fulfilled';
  //       if(repos.status === status){
  //         setRepos(repos.value.data)
  //       }
  //       if(followers.status === status){
  //         setFollowers(followers.value.data)
  //       }
  //     })
  //   }
  // }

  const searchGithubUser = async (user) => {
    setError({ show: false, msg: '' })
    setLoading(true)

    try {
      const response = await fetch(`${rootUrl}/users/${user}`)
      const data = await response.json()
      const { followers_url, repos_url } = data
      console.log(data);
      if (!data.message) {
        setUser(data)
        await Promise.allSettled([
          findRepos(`${repos_url}?per_page=100`),
          findFollowers(`${followers_url}?per_page=100`)])
      } else {
        setError({ show: true, msg: 'No user with that name' })
      }
    } catch (error) {
      console.log(error);
    }
    checkRequests()
    setLoading(false)
  }

  const findRepos = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setRepos(data)
    } catch (error) {
      console.log(error);
    }
  }
  const findFollowers = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setFollowers(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkRequests();
  }, [])

  return <GithubContext.Provider value={{
    user,
    repos,
    followers,
    requests,
    error,
    loading,
    searchGithubUser,
  }}>
    {children}
  </GithubContext.Provider>
}

export { GithubProvider, GithubContext }