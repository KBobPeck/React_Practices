import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const {loading, page, nbPages, handlePage} = useGlobalContext()

  return <div className="btn-container">
    <button onClick={()=>handlePage('dec')} disabled={loading}>
      Prev
    </button>
    <p>{page+1} of {nbPages}</p>
    <button onClick={()=>handlePage('inc')} disabled={loading}>
      next
    </button>
  </div>
}

export default Buttons
