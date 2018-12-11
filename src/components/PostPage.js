import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetPost, handleGetAllPosts } from '../actions/posts'
import { handleGetComments } from '../actions/comments'
import Post from './Post'
import CommentsList from './CommentsList'
import FormComment from './FormComment'

class PostPage extends Component {

  componentDidMount() {
    const { id } = this.props
		this.props.dispatch(handleGetAllPosts())
    this.props.dispatch(handleGetComments(id))
	}

  render() {
    const { id, commentIds, postIndex } = this.props

    return(
      <div>
        {/* Abre a postagem completa quando a posição da postagem é recuperada (diferente de -1) */}
        {postIndex !== -1 ? <Post id={postIndex} /> : null }
        {/* Todos os comentários da postagem completa */}
        <div className='card mt-2'>
          <div className='container'>
            <h4 className='text-muted mt-3 mb-4'><span>| </span>Comments ({commentIds.length})</h4>
            {/* Formulário para criar um novo comentário */}
            <FormComment id={id} />
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

function mapStateToProps ({ posts, comments }, props) {
  const { id } = props.match.params

  // Recupera a posição de um post no array para abrir o post correto
  let currentPostIndex = -1;
  Object.keys(posts).forEach(index => {
    if(posts[index].id === id)
      currentPostIndex = index
  })

  return {
    id,
    postIndex: currentPostIndex,
    commentIds: Object.keys(comments)
        .sort((a,b) => comments[b].timestamp - comments[a].timestamp)
  }
}

export default connect(mapStateToProps)(PostPage)
