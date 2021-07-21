import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({ index, rgb, weight, hexColor }) => {
  const [alert, setAlert] = useState(false)
  const bcg = rgb.join(",")
  //or use hexColor
  const hex = rgbToHex(...rgb)
  const hexValue = `#${hexColor}`
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 1000);
    return () => {
      clearTimeout(timeout)
    }
  }, [alert])

  return <>
    <article
      className={`${index < 10 ? 'color' : ' color color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={(e)=>{
        setAlert(true)
        navigator.clipboard.writeText(hexValue)
      }}
    >
      <p>weight: {weight}</p>
      <p>rgb: {bcg}</p>
      <p>hex: {hexValue}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  </>
}

export default SingleColor
