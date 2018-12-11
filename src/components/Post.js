import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiUserOutline,
         TiHeartOutline,
         TiMessage } from 'react-icons/ti/index'
import { Link } from 'react-router-dom'
import { handleAddVote } from '../actions/posts'

class PostList extends Component {

  /*
    o método preventDefault previne o comportamento default do objeto,
    ou seja, cancela o comportamento que os elementos geralmente tem na página,
    então se o comportamento padrão de um link é abrir um site, nós vamos cancelar isso.
  */

  handleVote = (option) => {

    const { dispatch, post } = this.props

    dispatch(handleAddVote( post, option ))
  }

  render() {

    const { post } = this.props

    if (post === null) {
      return <p>This Post doesn't existd</p>
    }

    const {
      id, author, category, timestamp, title, body, voteScore, commentCount
    } = post

    return(
      <div className='card mt-2'>
        <div className='card-body'>
          <div className='container'>
            <div className='row'>
              <Link to={`/${category}`} className='card-category'>
              <button className='btn mb-3 py-1'>{category}</button>
              </Link>
            </div>
            <div className='row'>
              <TiUserOutline
                className='text-muted'
              />
              <p className='card-author text-muted mr-1 mb-0'>{author}</p>
            </div>
          </div>
          <p className='card-timestamp text-muted'>{formatDate(timestamp)}</p>
          <Link to={`/${category}/${id}`}>
          <h5 className='card-title'>{title}</h5>
          </Link>
          <p className='card-text text-muted'>{body}</p>
          <hr></hr>
          <div className='container'>
            <div className='row'>
                <TiHeartOutline
                  color='#B06AB3'
                  className='heart-up'
                  onClick={() => this.handleVote("upVote")}
                />
                <p className='mx-2 text-muted'>{voteScore}</p>
                <TiHeartOutline
                  color='#B06AB3'
                  className='heart-down'
                  onClick={() => this.handleVote("downVote")}
                />
                <p className='ml-auto mr-2 text-muted'>{commentCount}</p>
                <TiMessage
                  color='#B06AB3'
                  className='message'
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Preciso ver uma forma de retornar apenas um post

function mapStateToProps ({ posts }, { id }) {
  const post = posts[id]

  return {
    post
  }
}

export default connect(mapStateToProps)(PostList)
