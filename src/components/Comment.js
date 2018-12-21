import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaTrash, FaPen, FaHeartbeat, FaHeart } from 'react-icons/fa'
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
  handleEditedCanceled = () => {
    this.setState({ commentSelected: false })
  }

  handleDelete = () => {
    const { dispatch, comment } = this.props
    dispatch(handleDeleteComment(comment))
    //console.log('Comentário deletado:', comment)
  }

  render() {
    const { id, comment } = this.props
    const { author, timestamp, body, voteScore } = comment

    // Condição para abrir o formulário para edição de comentário
    if (this.state.commentSelected) {
      return (
        <div className='container container-edit-post-comment my-5 p-3'>
          <FormComment
            id={id}
            onUpdateComment={this.handleEditedCanceled}
          />
        </div>
      )
    }

    return (
      <div>
        <div className='card-body'>
          <hr className='mt-0'></hr>
          <div className='container'>
            <div className='row'>
              <p className='card-author text-muted'>By <strong>{author}</strong> at {formatDate(timestamp)}</p>
              <div className='ml-auto'>
                <div className='post-options pl-4'>
                  <FaPen
                    className='text-muted mr-3'
                    onClick={this.handleEdit}
                  />
                  <FaTrash
                    className='text-muted mr-3'
                    onClick={this.handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className='card-text text-muted'>{body}</p>
          <div className='container'>
            <div className='row'>
              <FaHeartbeat
                color='#B06AB3'
                className='heart-up'
                onClick={() => this.handleVote("upVote")}
              />
              <p className='mx-2 text-muted'>{voteScore}</p>
              <FaHeart
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
