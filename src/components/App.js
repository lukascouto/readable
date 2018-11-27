import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import PostPage from './PostPage'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    //console.log(this.props)
    return (
      <div className='container'>
        <PostPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}}/>
        {/*<Dashboard />*/}
      </div>
    )
  }
}

export default connect()(App)
