import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaTrash, FaPen, FaShareAlt, FaHeartbeat, FaHeart, FaComment } from 'react-icons/fa'
import { Animated } from "react-animated-css";
import ReactMarkdown from 'react-markdown/with-html'
import { Link } from 'react-router-dom'
import { handleGetAllPosts, handleAddVote, handleDeletePost } from '../actions/posts'
import FormPost from './FormPost'

class PostList extends Component {

  state = {
    postSelected: false
  }

  handleVote = (option) => {
    const { dispatch, post } = this.props
    dispatch(handleAddVote( post, option ))
  }

  handleEdit = () => {
    this.setState({ postSelected: true })
  }

  handleEditedCanceled = () => {
    this.setState({ postSelected: false })
  }

  handleDelete = () => {
    const { dispatch, post } = this.props
    dispatch(handleDeletePost(post))
  }

  render() {

    const { post, id } = this.props

    const {
      author, category, timestamp, title, body, voteScore, commentCount
    } = post

    if (this.state.postSelected) {
      return (
        <div className='container container-edit-post-comment my-5 p-3'>
          <h3 className='text-center text-muted mt-3 mb-5'>Edit Post</h3>
          <FormPost
            id={id}
            onUpdatePost={this.handleEditedCanceled}
          />
        </div>
      )
    }

    return (

        <div className='card mt-2'>
          <div className='card-body'>
            <div className='container'>
              <div className='row'>
                <Link to={`/${category}`} className='card-category'>
                <button className='btn mb-3 py-1'>{category}</button>
                </Link>
                <div className='ml-auto'>
                  <div className='post-options px-3'>
                    <FaPen
                      className='text-muted mr-3'
                      onClick={this.handleEdit}
                    />
                    <FaTrash
                      className='text-muted mr-3'
                      onClick={this.handleDelete}
                    />
                    <FaShareAlt
                      className='text-muted'
                      onClick={this.handleDelete}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Link to={`/${category}/${id}`}>
            <h5 className='card-title mb-1'>{title}</h5>
            <p className='card-author text-muted'>By <strong>{author}</strong> at {formatDate(timestamp)}</p>
            </Link>
            <ReactMarkdown source={body} escapeHtml={false}/>
            <hr></hr>
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
                  <p className='ml-auto mr-2 text-muted'>{commentCount}</p>
                  <FaComment
                    color='#B06AB3'
                    className='message'
                  />
              </div>
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps ({ posts }, { id }) {
  const post = posts[id]

  return {
    id,
    post,
  }
}

export default connect(mapStateToProps)(PostList)
