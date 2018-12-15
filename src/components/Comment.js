import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiHeartOutline } from 'react-icons/ti/index'
import { handleDeleteComment, handleAddVote } from '../actions/comments'
import FormComment from './FormComment'

class CommentsList extends Component {

  state = {
    commentSelected: false
  }

  handleVote = (option) => {
    const { dispatch, comment } = this.props
    dispatch(handleAddVote( comment, option ))
  }

  // Seta um valor verdadeiro após clicar em editar um comentário
  // Passa no if do render e com isso abre o FormComment com o corpo preenchido
  handleEdit = () => {
    this.setState({ commentSelected: true })
  }

  // Seta um valor falso após editar um comentário
  // Não passa no if do render e com isso fecha o FormComment
  handleEdited = () => {
    this.setState({ commentSelected: false })
  }

  handleDelete = () => {
    const { dispatch, comment } = this.props
    dispatch(handleDeleteComment(comment))
  }

  render() {
    const { id, comment } = this.props
    const { author, timestamp, body, voteScore } = comment

    // Condição para abrir o formulário para edição de comentário
    if (this.state.commentSelected) {
      return (
        <div className='container mt-5'>
          <FormComment
            id={id}
            onUpdateComment={this.handleEdited}
          />
        </div>
      )
    }

    return (
      <div>
        <div className='card-body'>
          <hr className='mt-0'></hr>

          <button
            className='btn btn-light'
            onClick={this.handleDelete}
          >
            Excluir
          </button>

          <button
            className='btn btn-light'
            onClick={this.handleEdit}
          >
            Editar
          </button>

          <p className='card-author text-muted mr-1 mb-0'>by {author}</p>
          <p className='card-timestamp text-muted'>{formatDate(timestamp)}</p>
          <p className='card-text'>{body}</p>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ comments }, { id }) {
  const comment = comments[id]

  return {
    id,
    comment
  }
}

export default connect(mapStateToProps)(CommentsList)
