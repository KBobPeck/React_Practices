import React, { useState } from 'react';
import data from './data';
function App() {

  const [count, setCount] = useState(0)
  const [text, setText] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(count < 1) return setText(data.slice(0, 1))
    if(count > 8) return setText(data.slice(0, 8))
    setText(data.slice(0, count))
  }

  return (
    <>
      <section className="section-center">
        <h3>tired of boring lorem ipsum</h3>
        <form onSubmit={handleSubmit} className="lorem-form">
          <label htmlFor="amount">paragraphs: </label>
          <input
            type="number"
            name="number"
            id="amount"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <button className="btn" type="submit">generate</button>
        </form>
      </section>
      <article>
        {text.map((para, index) =>{ 
        return<p key={index}>
          {para}
        </p>
        })}
      </article>
    </>
  )
}

export default App;
