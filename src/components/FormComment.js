import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment } from '../actions/comments'

class FormComment extends Component {

  state = {
    text: '',
    author: '',
  }

  // Pega o name que for igual ao state e repassa o value
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text, author } = this.state
    const { dispatch, post } = this.props

    dispatch(handleAddComment(text, author, post))

    // Limpa os campos do formulário
    this.setState(() => ({
      text: '',
      author: ''
    }))
  }
  render() {
    const { author, text } = this.state
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='"form-group"'>
            <input
              className='form-control mb-3'
              placeholder="Your name"
              name="author"
              value={author}
              onChange={this.handleChange}
            />
            <textarea
              className='form-control mb-3'
              rows='3'
              placeholder="Type a comment..."
              name="text"
              value={text}
              onChange={this.handleChange}
            />
            <button
              className='btn btn-primary'
              type='submit'>
                Comment
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ post }) {

  return {
    post
  }
}

export default connect(mapStateToProps)(FormComment)
