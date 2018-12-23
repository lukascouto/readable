import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Dashboard from './Dashboard'
import PostPage from './PostPage'
import FormPost from './FormPost'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className='container'>
            <Route path='/' exact component={Dashboard} />
            <Route path='/:category/' exact component={Dashboard} />
            <Route path='/:category/:id' exact component={PostPage} />
            <Route path='/new-post' exact component={FormPost} />
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ posts, loading }) {

  return {
    posts,
    loading,
  }
}

export default connect(mapStateToProps)(App)
