import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetPost } from '../actions/post'
import { handleGetComments } from '../actions/comments'
import Post from './Post'
import CommentsList from './CommentsList'

class PostPage extends Component {
  componentDidMount () {
		const { id } = this.props
		this.props.dispatch(handleGetPost(id))
    this.props.dispatch(handleGetComments(id))
	}
  render() {
    const { post } = this.props
    return(
      <div>
        <Post post={post} />
        <div className='card mt-2'>
        <div className='container'>
          <h4 className='text-muted mt-3'><span>| </span>Comments</h4>
        </div>
        <ul>
          {this.props.commentIds.map((id) => (
            <li key={id}>
              <CommentsList id={id} />
            </li>
          ))}
        </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ post, comments }, props) {
  const { id } = props.match.params

  return {
    id,
    post,
    commentIds: Object.keys(comments)
      .sort((a,b) => comments[b].timestamp - comments[a].timestamp)
  }
}

export default connect(mapStateToProps)(PostPage)
