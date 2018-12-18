import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetAllPosts } from '../actions/posts'
import { handleGetComments } from '../actions/comments'
import { GoRocket } from 'react-icons/go'
import { TiWeatherStormy } from 'react-icons/ti'
import Post from './Post'
import Comment from './Comment'
import FormComment from './FormComment'

class PostPage extends Component {

  componentDidMount() {
    const { id } = this.props
		this.props.dispatch(handleGetAllPosts())
    this.props.dispatch(handleGetComments(id))
	}

  render() {

    const { id, comments, commentIds, postIndex } = this.props

    // Ao acessar a url da postagem deletada,
    // postIndex recebe -1 por não ter encontrado o post no array.
    // Então, renderiza esta mensagem de página não encontrada.
    if (postIndex === -1) {
      return (
        <div className='container text-center text-muted mt-5'>
          <TiWeatherStormy style={{
            fontSize: '100px',
            color: '#B06AB3',
            margin: '20px'
            }}
          />
          <h2><span style={{color: '#B06AB3'}}>Oops! </span>Something's wrong here...</h2>
          <p>We can't find the page you're looking for. :(</p>
        </div>
      )
    }

    return (
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
          <div>
            {/* Verifica se o array de comentários está vazio para retornar uma mensagem */}
            {comments.length === 0 ?
              <div className='container text-center text-muted mt-5'>
                <GoRocket style={{
                  fontSize: '100px',
                  color: '#B06AB3',
                  margin: '20px'
                  }}
                />
                <h2><span style={{color: '#B06AB3'}}>Hey! </span>No comments yet.</h2>
                <p>You can be the first! ;)</p>
              </div> : null
            }
          </div>
          <ul>
            {commentIds.map((commentId) => (
              <li key={commentId}>
                <Comment id={commentId} />
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
    comments,
    postIndex: currentPostIndex,
    commentIds: Object.keys(comments)
        .sort((a,b) => comments[b].timestamp - comments[a].timestamp)
  }
}

export default connect(mapStateToProps)(PostPage)
