import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import Post from './Post'
import { GoRocket } from 'react-icons/go'
import { handleGetAllPosts } from '../actions/posts'

class Dashboard extends Component {

  componentDidMount () {
		this.props.dispatch(handleGetAllPosts(this.props.category))
	}

	componentDidUpdate (prevProps) {
		if (this.props.category !== prevProps.category) {
			this.props.dispatch(handleGetAllPosts(this.props.category))
		}
	}

  render() {
    const { posts, pathname, postIndexes } = this.props

    if (posts.length === 0 && pathname !== '/new-post') {
      return (
        <div className='container text-center text-muted mt-5'>
          <GoRocket style={{fontSize: '100px', color: '#B06AB3', margin: '20px'}}/>
          <h2>No posts yet.</h2>
          <p>You can be the first! ;)</p>
        </div>
      )
    }

    return (
      <div>
        {pathname !== '/new-post' ?
        <Filter />
        : null }
        <ul>
          {postIndexes.map((index) => (
            <li key={index}>
              <Post id={index} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts, filter }, props) {
  const { category } = props.match.params
	const { pathname } = props.location

  let indexes = []

  if (filter.option === 'date') {
    filter.order === true ?
      indexes = Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp) :
      indexes = Object.keys(posts).sort((a,b) => posts[a].timestamp - posts[b].timestamp)
  }
  if (filter.option === 'vote') {
    filter.order === true ?
      indexes = Object.keys(posts).sort((a,b) => posts[a].voteScore - posts[b].voteScore) :
      indexes = Object.keys(posts).sort((a,b) => posts[b].voteScore - posts[a].voteScore)
  }
  if (filter.option === 'comments') {
    filter.order === true ?
      indexes = Object.keys(posts).sort((a,b) => posts[b].commentCount - posts[a].commentCount) :
      indexes = Object.keys(posts).sort((a,b) => posts[a].commentCount - posts[b].commentCount)
  }

  return {
    postIndexes: indexes,
    category,
  	pathname,
    posts,
    filter
  }
}

export default connect(mapStateToProps)(Dashboard)
