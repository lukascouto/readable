import React from 'react'
import { NavLink } from 'react-router-dom'
 export default function Nav () {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white">
      <div className="navbar navbar-nav">
        <NavLink to='/' exact activeClassName='active' className='nav-item nav-link'>
          All
        </NavLink>
        <NavLink to='/react' activeClassName='active' className='nav-item nav-link'>
          React
        </NavLink>
        <NavLink to='/redux' activeClassName='active' className='nav-item nav-link'>
          Redux
        </NavLink>
        <NavLink to='/udacity' activeClassName='active' className='nav-item nav-link'>
          Udacity
        </NavLink>
      </div>
    </nav>
  )
}
