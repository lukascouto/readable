import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaTrash, FaPen, FaShareAlt, FaHeartbeat, FaHeart, FaComment } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { handleAddVote, handleDeletePost } from '../actions/posts'

class PostList extends Component {

  handleVote = (option) => {
    const { dispatch, post } = this.props

    dispatch(handleAddVote( post, option ))
  }

  handleEdit = () => {
    console.log('Editou')
  }

  handleDelete = () => {
    const { dispatch, post } = this.props

    dispatch(handleDeletePost(post))
  }

  render() {

    const { post } = this.props

    const {
      id, author, category, timestamp, title, body, voteScore, commentCount
    } = post

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
          <p className='card-text text-muted'>{body}</p>
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
    post,
  }
}

export default connect(mapStateToProps)(PostList)
