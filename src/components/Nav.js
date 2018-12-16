import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaPlusCircle } from 'react-icons/fa'
//import book from '../icons/book.svg'

class Nav extends Component {
	render () {
    const { categories } = this.props
		return (
			<div>
				<div className='banner'>
					<div className='container'>
						<div className='row'>
						{/*
							<img
								src={book}
								style={{
									width: '50px',
									height: '50px',
									fill: 'white'
								 }}
								className=''
								alt="logo" />
								*/}
							<Link to={'/'}>
							<h1 className='ml-3 mt-4 mb-3 text-light'>Readable</h1>
							</Link>
							<Link to={'/new-post'} className='ml-auto mt-4'>
							<FaPlusCircle color='#fff'
							style={{fontSize: '30px'}}/>
							</Link>
						</div>
					</div>
				</div>
	      <nav className="navbar navbar-expand navbar-dark bg-white mb-4 mt-4">
	        <div className="navbar-nav my-2 mx-auto">
	          {categories.length > 0 ? (
	            categories.map(category => (
	              <NavLink key={category.name} exact to={`/${category.path}`} className='nav-item nav-link mr-3 px-3'>
	                {category.name}
	              </NavLink>
	            ))
	          ) : null}
	        </div>
	      </nav>
			</div>
		)
	}
}

function mapStateToProps ({ categories }, props) {
	return {
		categories
	}
}

export default connect(mapStateToProps)(Nav)
