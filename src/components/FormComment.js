import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleAddComment, handleEditComment } from '../actions/comments'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class FormComment extends Component {

  state = {
    body: '',
    author: '',
    open: false,
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

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  // Para cada valor digitado, o estado correspondente será atualizado
  // handleClose mudará o estado do Snackbar para fechar a mensagem após uma nova interação com o form
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.handleClose()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { body, author } = this.state
    const { dispatch, comment, id } = this.props

    if (body !== '' && author !== '') {
      // Se existe um comentário, o dispatch é para editar o comentário e em seguida fechar o formulário
      // Caso contrário, trata-se de um novo comentário
      comment ? dispatch(handleEditComment(comment, body)) && this.props.onUpdateComment()
              : dispatch(handleAddComment(body, author, id))

      this.setState(() => ({
        body: '',
        author: ''
      }))
    } else {
      // Chama e exibe a mensagem de campos vazios
      this.handleClick()
    }
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
            {/* Apenas exibe este campo se o form não for editar um comentário */}
            {!comment ?
              <input
                className="form-control mb-3"
                placeholder="Your name"
                name="author"
                value={author}
                onChange={this.handleChange}
              />
              : <p className="card-author text-muted">By <strong>{comment.author}</strong> at {formatDate(comment.timestamp)}</p>}
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Type a comment..."
              name="body"
              value={body}
              onChange={this.handleChange}
            />
            <button
              className="btn btn-primary"
              onClick={() => this.onUpdateComment}
              type="submit">
                {comment ? "Edit" : "Comment"}
            </button>
            {/* Só exibe este botão se for editar um comment */}
            {comment ?
              <button
                className="ml-1 btn btn-secondary"
                onClick={this.handleEditedCanceled}>
                  Cancel
              </button> : null}
          </div>
        </form>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          message={<span className="text-white">You must fill in all of the fields.</span>}
        />
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
