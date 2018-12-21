import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleAddComment, handleEditComment } from '../actions/comments'

class FormComment extends Component {

  state = {
    body: '',
    author: '',
  }

  componentDidMount() {
    const { comment } = this.props

    if (comment) {
      this.setState({
        body: comment.body,
        author: comment.author
      })
    }
  }

  // Para cada valor digitado, o estado correspondente será atualizado
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { body, author } = this.state
    const { dispatch, comment, id } = this.props

    // Se existe um comentário, o dispatch é para editar o comentário e em seguida fechar o formulário
    // Caso contrário, significa que trata-se de um novo comentário
    comment ? dispatch(handleEditComment(comment, body)) && this.props.onUpdateComment()
            : dispatch(handleAddComment(body, author, id))

    this.setState(() => ({
      body: '',
      author: ''
    }))
  }

  handleEditedCanceled = (e) => {
    e.preventDefault()

    this.props.onUpdateComment()
  }

  render () {

    const { author, body } = this.state
    const { comment } = this.props

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='"form-group"'>
            {!comment ?
              <input
                className='form-control mb-3'
                placeholder="Your name"
                name="author"
                value={author}
                onChange={this.handleChange}
              />
              : <p className='card-author text-muted'>By <strong>{comment.author}</strong> at {formatDate(comment.timestamp)}</p>}
            <textarea
              className='form-control mb-3'
              rows='3'
              placeholder="Type a comment..."
              name="body"
              value={body}
              onChange={this.handleChange}
            />
            <button
              className='btn btn-primary'
              onClick={() => this.onUpdateComment}
              type='submit'>
                {comment ? 'Edit' : 'Comment'}
            </button>
            {comment ? <button
                      className='ml-1 btn btn-secondary'
                      onClick={this.handleEditedCanceled}>
                        Cancel
                    </button>
                  : null}
          </div>
        </form>
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

export default connect(mapStateToProps)(FormComment)
