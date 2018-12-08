import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetPost } from '../actions/post'
import { handleGetComments } from '../actions/comments'
import Post from './Post'
import CommentsList from './CommentsList'
import FormComment from './FormComment'

class PostPage extends Component {
  componentDidMount() {
		const { id } = this.props
		this.props.dispatch(handleGetPost(id))
    this.props.dispatch(handleGetComments(id))
	}
  render() {
    const { post, commentIds } = this.props

    return(
      <div>
        {/* Postagem completa */}
        <Post post={post} />
        {/* Todos os comentários da postagem completa */}
        <div className='card mt-2'>
          <div className='container'>
            <h4 className='text-muted mt-3 mb-4'><span>| </span>Comments ({commentIds.length})</h4>
            {/* Formulário para criar um novo comentário */}
            <FormComment />
          </div>
          <ul>
            {commentIds.map((commentId) => (
              <li key={commentId}>
                <CommentsList id={commentId} />
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
