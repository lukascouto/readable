import React, { Component, Fragment } from 'react'
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
  render(props) {
    return (

      //<PostPage match={{params: {id: [0]}}}/>

      <Router>
        <Fragment>
          <Nav />
          <div className='container'>
          </div>
          {this.props.loading === true
            ? <p>Ho ho ho</p>
            : <div className='container'>
                <Route path='/' exact component={Dashboard} />
                <Route path='/:category/' exact component={Dashboard} />
                <Route path='/:category/:id' exact component={PostPage} />
                <Route path='/new-post' exact component={FormPost} />
              </div>}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ posts }) {

  return {
    loading: posts === null
  }
}

export default connect(mapStateToProps)(App)
