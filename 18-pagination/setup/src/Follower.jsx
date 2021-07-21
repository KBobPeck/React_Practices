import React from 'react'

const Follower = ({login, avatar_url:image, html_url:url}) => {
  return <article className="card">
    <img src={image} alt={login} />
    <h4>{login}</h4>
    <a href={url} className='btn'>View Profile</a>
  </article>
}

export default Follower
