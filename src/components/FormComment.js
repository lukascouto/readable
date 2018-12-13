import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment } from '../actions/comments'

class FormComment extends Component {

  state = {
    text: '',
    author: '',
  }

  componentDidMount() {
    const { comment } = this.props

    if (comment) {
      this.setState({
        text: comment.body,
        author: comment.author
      })
    }
  }

  // Pega o name que for igual ao state e repassa o value
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text, author } = this.state
    const { dispatch, comment } = this.props

    if (comment) {
      console.log('Editou!')
    } else {
      dispatch(handleAddComment(text, author))
    }

    // Limpa os campos do formulário
    this.setState(() => ({
      text: '',
      author: ''
    }))
  }

  render () {
    const { author, text } = this.state
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
              : <p>{author}</p> }
            <textarea
              className='form-control mb-3'
              rows='3'
              placeholder="Type a comment..."
              name="text"
              value={text}
              onChange={this.handleChange}
            />
            <button
              className='btn btn-light'
              type='submit'>
                Comment
            </button>
          </div>
        </form>
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

export default connect(mapStateToProps)(FormComment)
