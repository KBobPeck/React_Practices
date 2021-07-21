import React from 'react'
import logo from './images/logo.svg'
import { FaBars } from 'react-icons/fa'
import { useGlobalContext } from './context'

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext()

  //you can make this directly on the onMouseOver event at the start but 
  //we are going to add alot more to this and we will need to make us a 
  //sepeate function
  const displaySubmenu = (e) => {
    const page = e.target.textContent
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) /2
    const bottom = tempBtn.bottom - 3
    openSubmenu(page, {center, bottom})
  }

  const handleCloseSubmenu = (e) => {
    if(!e.target.classList.contains('link-btn')){
      closeSubmenu()
    }
  }

  return <nav className="nav" onMouseOver={handleCloseSubmenu}>
    <div className="nav-center">
      <div className="nav-header">
        <img src={logo} alt="Stripe" className='nav-logo' />
        <button className="btn toggle-btn" onClick={openSidebar}>
          <FaBars />
        </button>
      </div>
      <ul className="nav-links">
        <li>
          <button onMouseOver={displaySubmenu} className="link-btn">products</button>
        </li>
        <li>
          <button onMouseOver={displaySubmenu} className="link-btn">developers</button>
        </li>
        <li>
          <button onMouseOver={displaySubmenu} className="link-btn">company</button>
        </li>
      </ul>
      <button className="btn signin-btn">Sign in</button>
    </div>
  </nav >
}

export default Navbar
