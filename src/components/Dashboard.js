import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import Post from './Post'
import { GoRocket } from 'react-icons/go'
import { Animated } from "react-animated-css";
import { handleGetAllPosts } from '../actions/posts'

class Dashboard extends Component {

	componentDidUpdate (prevProps) {
		if (this.props.category !== prevProps.category) {
			this.props.dispatch(handleGetAllPosts(this.props.category))
		}
	}

  render() {
    const { posts, pathname, postIds } = this.props

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
					<div>
		        <Filter />
						<Animated animationIn="fadeInLeft" isVisible={true}>
		        <ul>
		          {postIds.map((id) => (
		            <li key={id}>
		              <Post id={id} />
		            </li>
		          ))}
		        </ul>
		      </Animated>
				</div>
			: null}
      </div>
    )
  }
}

function mapStateToProps ({ posts, filter }, props) {
  const { category } = props.match.params
	const { pathname } = props.location

  let ids = []

  if (filter.option === 'date') {
    filter.order === true ?
      ids = Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp) :
      ids = Object.keys(posts).sort((a,b) => posts[a].timestamp - posts[b].timestamp)
  }
  if (filter.option === 'vote') {
    filter.order === true ?
      ids = Object.keys(posts).sort((a,b) => posts[a].voteScore - posts[b].voteScore) :
      ids = Object.keys(posts).sort((a,b) => posts[b].voteScore - posts[a].voteScore)
  }
  if (filter.option === 'comments') {
    filter.order === true ?
      ids = Object.keys(posts).sort((a,b) => posts[b].commentCount - posts[a].commentCount) :
      ids = Object.keys(posts).sort((a,b) => posts[a].commentCount - posts[b].commentCount)
  }

  let filtered_keys = ids.filter(id => !posts[id].deleted)

  return {
    postIds: filtered_keys,
    category,
  	pathname,
    posts,
    filter
  }
}

export default connect(mapStateToProps)(Dashboard)
