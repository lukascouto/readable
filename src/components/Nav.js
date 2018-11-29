import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
	render () {
    const { categories } = this.props
		return (
      <nav className="navbar navbar-expand navbar-light bg-white">
        <div className="navbar-nav">
          <NavLink exact to={'/'} activeClassName="active" className='nav-item nav-link'>
            All
          </NavLink>
          {categories.length > 0 ? (
            categories.map(category => (
              <NavLink key={category.name} exact to={`/${category.path}`} activeClassName="active" className='nav-item nav-link'>
                {category.name}
              </NavLink>
            ))
          ) : null}
        </div>
      </nav>
		)
	}
}

function mapStateToProps ({ categories }, props) {
	return {
		categories
	}
}

export default connect(mapStateToProps)(Nav)
