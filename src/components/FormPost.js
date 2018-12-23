import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddPost, handleEditPost } from '../actions/posts'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class FormPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: 'react',
    toHome: false,
    open: false,
  }

  componentDidMount() {
    const { post } = this.props

    if (post) {
      this.setState({
        title: post.title,
        body: post.body,
        author: post.author
      })
    }
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  // Pega o name que for igual ao state e repassa o value
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.handleClose()
  }

  handleSubmit = (e) => {
    /*
      o método preventDefault previne o comportamento default do objeto,
      ou seja, cancela o comportamento que os elementos geralmente tem na página,
      então se o comportamento padrão de um link é abrir um site, nós vamos cancelar isso.
    */
    e.preventDefault()

    const { title, body, author, category } = this.state
    const { dispatch, post } = this.props

    if (title !== '' && body !== '' && author !== '') {
      post ? dispatch(handleEditPost(post, title, body)) && this.props.onUpdatePost()
           : dispatch(handleAddPost(title, body, author, category))

      this.setState({ toHome: post ? false : true })
    } else {
      this.handleClick()
    }
  }

  handleEditedCanceled = (e) => {
    e.preventDefault()

    this.props.post ? this.props.onUpdatePost()
                    : this.setState({ toHome: true })

  }

  render() {
    const { title, body, author, toHome } = this.state
    const { categories, post } = this.props

    if (toHome === true) {
      return <Redirect to='/'/>
    }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group mb-5">
            {post ? <p className="text-muted mb-5">Author: <strong>{author}</strong> | Category: <strong>{post.category}</strong></p>
                  : <select
                      className="form-control mb-3"
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
                    </select>}
            {post ? null
                  : <input
                      className="form-control mb-3"
                      placeholder="Your name"
                      name="author"
                      value={author}
                      onChange={this.handleChange}
                    />}
            <input
              className="form-control mb-3"
              placeholder="Title"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
            <textarea
              className="form-control mb-3"
              rows="8"
              placeholder="Post..."
              name="body"
              value={body}
              onChange={this.handleChange}
            />
            <button
              className="btn btn-primary"
              type="submit">
                {post ? "Edit" : "Post"}
            </button>
            <button
              className="ml-1 btn btn-secondary"
              onClick={this.handleEditedCanceled}>
                Cancel
            </button>
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

function mapStateToProps ({ categories, posts }, { id }) {
  const post = posts[id]

  return {
    categories,
    post,
    id
  }
}

export default connect(mapStateToProps)(FormPost)
