import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetComments } from '../actions/comments'
import { GoRocket } from 'react-icons/go'
import { TiWeatherStormy } from 'react-icons/ti'
import Post from './Post'
import Comment from './Comment'
import FormComment from './FormComment'

class PostPage extends Component {

  componentDidMount () {
    this.props.dispatch(handleGetComments(this.props.id))
	}

  render() {
    const { id, post, commentIds } = this.props

    if (post === undefined) {
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
        <Post id={id} />
        {/* Todos os comentários da postagem completa */}
        <div className='card mt-2'>
          <div className='container'>
            <h4 className='text-muted mt-3 mb-4'><span>| </span>Comments ({commentIds.length})</h4>
            <FormComment id={id} />
          </div>
          <div>
            {/* Verifica se o array de comentários está vazio para retornar uma mensagem */}
            {commentIds.length === 0 ?
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

function mapStateToProps ({ comments, posts }, props) {
  const { id } = props.match.params
  const post = posts[id]

  let keys = Object.keys(comments)
  let filtered_keys = keys.filter(key => !comments[key].deleted).sort((a,b) => comments[b].timestamp - comments[a].timestamp)

  return {
    id,
    post,
    commentIds: filtered_keys

  }
}

export default connect(mapStateToProps)(PostPage)
