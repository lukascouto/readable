import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import { handleLoading } from '../actions/loading'
import { handleGetAllPosts } from '../actions/posts'
import LoadingScreen from 'react-loading-screen'
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
      //<PostPage match={{params: {id: [0]}}}/>
      <Router>
        <Fragment>
          <div>
            <Nav />
            <div className='container'>
              <Route path='/' exact component={Dashboard} />
              <Route path='/:category/' exact component={Dashboard} />
              <Route path='/:category/:id' exact component={PostPage} />
              <Route path='/new-post' exact component={FormPost} />
            </div>
          </div>
        </Fragment>
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
