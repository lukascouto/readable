import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/posts'

class FormPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  }

  // Pega o name que for igual ao state e repassa o value
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.category)
  }

  handleChangeCategory = (e) => {
    console.log(e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { title, body, author, category } = this.state
    const { dispatch } = this.props

    dispatch(handleAddPost(title, body, author, category))
  }
  render() {
    const { title, body, author } = this.state
    const { categories } = this.props
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='"form-group"'>
          <select
            name="category"
            onChange={this.handleChange}
          >
          {categories.length > 0 ? (
            categories.map(category => (
              <option
                value={category.path}
                key={category.name}
              >
                {category.name}
              </option>
            ))
          ) : null}
        </select>
            <input
              className='form-control mb-3'
              placeholder="Your name"
              name="author"
              value={author}
              onChange={this.handleChange}
            />
            <input
              className='form-control mb-3'
              placeholder="Title"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
            <textarea
              className='form-control mb-3'
              rows='8'
              placeholder="Type a comment..."
              name="body"
              value={body}
              onChange={this.handleChange}
            />
            <button
              className='btn btn-primary'
              type='submit'>
                Post
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {

  return {
    categories
  }
}

export default connect(mapStateToProps)(FormPost)
