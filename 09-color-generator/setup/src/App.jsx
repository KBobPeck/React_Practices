import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'

function App() {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values('#f15025').all(10))
  //all(10) means that you take the 100 values and divide by 10 so we recive 10, set up a way to change that

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10)
      console.log(color, colors);
      setList(colors)
      setError(false)
    } catch (error) {
      setError(true)
      console.log((error));
    }
  }

  return <>
    <section className="container">
      <h3>color generator</h3>
      <form onSubmit={handleSubmit}>
        <input
          className={`${error ? 'error' : 'null'}`}
          type="text"
          value={color}
          onChange={(e) => { setColor(e.target.value) }}
          placeholder="#f15025"
        />
        <button type="submit" className="btn">Submit</button>
      </form>
    </section>
    <section className="colors">
      {list.map((color, index) => {
        return <SingleColor key={index} {...color} index={index} hexColor={color.hex}/>
      })}
    </section>
  </>
}

export default App
