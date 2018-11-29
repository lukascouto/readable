import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
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
    return(
      <div>
        <ul>
          {this.props.postIds.map((id) => (
            <li key={id}>
              <PostList id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// Pega os ids dos posts e ordena pela data (timestamp)
function mapStateToProps ({ posts }, props) {
  const { category } = props.match.params
	const { pathname } = props.location

  return {
    postIds: Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp),
    category,
  	pathname,
  }
}

export default connect(mapStateToProps)(Dashboard)
