import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiHeartOutline } from 'react-icons/ti/index'
import { handleDeleteComment, handleAddVote } from '../actions/comments'

class CommentsList extends Component {

  handleVote = (option) => {

    const { dispatch, comment } = this.props

    dispatch(handleAddVote( comment, option ))
  }

  handleDelete = () => {

    const { dispatch, comment } = this.props

    dispatch(handleDeleteComment(comment))

  }

  render() {
    const { comment } = this.props

    const {
      author, timestamp, body, voteScore
    } = comment

    return(
      <div>
        <div className='card-body'>
          <hr className='mt-0'></hr>

          {/*
          // Remove este comentário
          //comments/:id
          */}
          <button
            className='btn btn-primary'
            onClick={this.handleDelete}
          >
            Excluir
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
    comment
  }
}

export default connect(mapStateToProps)(CommentsList)
