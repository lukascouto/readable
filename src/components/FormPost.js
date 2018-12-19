import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddPost, handleEditPost } from '../actions/posts'

class FormPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: 'react',
    toHome: false,
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

  // Pega o name que for igual ao state e repassa o value
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    /*
      o método preventDefault previne o comportamento default do objeto,
      ou seja, cancela o comportamento que os elementos geralmente tem na página,
      então se o comportamento padrão de um link é abrir um site, nós vamos cancelar isso.
    */
    e.preventDefault()

    const { title, body, author, category } = this.state
    const { dispatch, post, id } = this.props

    post ? dispatch(handleEditPost(post, title, body)) && this.props.onUpdatePost()
         : dispatch(handleAddPost(title, body, author, category))

    this.setState({ toHome: post ? false : true })
  }

  render() {

    const { title, body, author, toHome, toPost } = this.state
    const { categories, post, id , postIndex} = this.props

    if (toHome === true) {
      return <Redirect to='/'/>
    }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group mb-5'>
            {post ? <p className='text-muted'>Category <strong>{post.category}</strong> | Author <strong>{author}</strong></p>
                  : <select
                      className='form-control mb-3'
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
                      className='form-control mb-3'
                      placeholder="Your name"
                      name="author"
                      value={author}
                      onChange={this.handleChange}
                    />}
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
              placeholder="Post..."
              name="body"
              value={body}
              onChange={this.handleChange}
            />
            <button
              className='btn btn-primary'
              type='submit'>
                {post ? 'Edit' : 'Post'}
            </button>
          </div>
        </form>
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
