import React from 'react'
import moment from 'moment'

import { useGlobalContext } from './context'

const Stories = () => {
  const { loading, hits, removeStory } = useGlobalContext()

  if (loading) {
    return <div className="loading"></div>
  }

  return <section className="stories">
    {hits.map((story) => {
      const { objectID: id, title, author, points, url, num_comments, created_at } = story
      return <article className="story" key={id}>
        <h4 className="title">{title}</h4>
        <p className="info">
          {points} points by <span>{author} | </span> {num_comments} comments
        </p>
        <p className="info">Created {moment(created_at).format('MMM Do YYYY')}</p>
        <div>
          <a
            href={url}
            className="read-link"
            target='_blank'
            rel="noopener noreferrer"
          >
            Read More
          </a>
          <button
            className='remove-btn'
            onClick={() => removeStory(id)}
          >
            remove
          </button>
        </div>
      </article>
    })}
  </section>
}

export default Stories
