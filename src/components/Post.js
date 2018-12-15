import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiHeartOutline } from 'react-icons/ti/index'
import { FiMessageCircle } from 'react-icons/fi'
import { FaUser, FaTrash, FaPen, FaShareAlt, FaRegHeart, FaRegComment } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { handleAddVote, handleDeletePost } from '../actions/posts'

class PostList extends Component {

  handleVote = (option) => {
    const { dispatch, post } = this.props

    dispatch(handleAddVote( post, option ))
  }

  handleDelete = () => {
    const { dispatch, post } = this.props

    dispatch(handleDeletePost(post))
  }

  render() {
    const { post } = this.props

    const {
      id, author, category, timestamp, title, body, voteScore, commentCount } = post

    return (
      <div className='card mt-2'>
        <div className='card-body'>
          <div className='container'>
            <div className='row'>
              <Link to={`/${category}`} className='card-category'>
              <button className='btn mb-3 py-1'>{category}</button>
              </Link>
              <div className='ml-auto'>
                <FaTrash
                  className='text-muted mr-3'
                  onClick={this.handleDelete}
                />
                <FaPen
                  className='text-muted mr-3'
                  onClick={this.handleDelete}
                />
                <FaShareAlt
                  className='text-muted'
                  onClick={this.handleDelete}
                />
              </div>
            </div>
            <div className='row'>
              <p className='card-author text-muted mb-0'>By {author}</p>
            </div>
          </div>
          <p className='card-timestamp text-muted'>{formatDate(timestamp)}</p>
          <Link to={`/${category}/${id}`}>
          <h5 className='card-title'>{title}</h5>
          </Link>
          <p className='card-text text-muted'>{body}</p>
          <hr></hr>
          <div className='container'>
            <div className='row'>
                <FaRegHeart
                  color='#B06AB3'
                  className='heart-up'
                  onClick={() => this.handleVote("upVote")}
                />
                <p className='mx-2 text-muted'>{voteScore}</p>
                <FaRegHeart
                  color='#B06AB3'
                  className='heart-down'
                  onClick={() => this.handleVote("downVote")}
                />
                <p className='ml-auto mr-2 text-muted'>{commentCount}</p>
                <FaRegComment
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
    post
  }
}

export default connect(mapStateToProps)(PostList)
