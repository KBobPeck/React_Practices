import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {

  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    console.log(linksHeight);
    if(showLinks){
      linksContainerRef.current.style.height = `${linksHeight}px`
    }else{
      linksContainerRef.current.style.height = `0px`
    }
  }, [showLinks]) 

  return <nav>
    <div className="nav-header">
      <img src={logo} alt="logo" />
      <button className="nav-toggle" onClick={() => { setShowLinks(!showLinks) }}>
        <FaBars />
      </button>
    </div>

    {/* <div className={`links-container ${showLinks && 'show-container'}`}> */}
    <div className='links-container' ref={linksContainerRef}>
      <ul className="links" ref={linksRef}>
        {/* you can show off hard coding and why it is bad, you need to refactor EVERYWHERE */}
        {/* <li><a href="#">home</a></li>
        <li><a href="#">about</a></li>
        <li><a href="#">contacts</a></li>
        <li><a href="#">products</a></li> */}
        {links.map((link) => {
          const { url, id, text } = link
          return <li key={id}>
            <a href={url}>{text}</a>
          </li>
        })}
      </ul>
    </div>

    <ul className="social-icons">
      {/* <li><a href="https://www/twitter.com"><FaTwitter/></a></li>
      <li><a href="https://www/twitter.com"><FaTwitter/></a></li>
      <li><a href="https://www/twitter.com"><FaTwitter/></a></li> */}
      {social.map((soc) => {
        const { id, url, icon } = soc
        return <li key={id}>
          <a href={url}>
            {icon}
          </a>
        </li>
      })}
    </ul>
  </nav>
}

export default Navbar
