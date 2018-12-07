import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiHeartFullOutline, TiHeartHalfOutline, TiMessage } from 'react-icons/ti/index'
import { Link } from 'react-router-dom'
import { handleVotePost } from '../actions/posts'

class Post extends Component {

  handleUpVote = (e) => {
    e.preventDefault()

    const { dispatch, post } = this.props

    dispatch(handleVotePost({
      id: post.id,
      option: 'upVote'
    }))
  }
  /*
  handleDownVote = (e) => {
    e.preventDefault()

    this.setState({ option: 'downVote' })

    const { dispatch, post } = this.props
    const { option } = this.state

    dispatch(handleVotePost({
      id: post.id,
      option
    }))
  }
  */
  render() {

    const { post } = this.props

    const {
      id, author, category, timestamp, title, body, voteScore, commentCount
    } = post

    return(
      <div className='card mt-2'>
        <div className='card-body'>
          <div className='container'>
            <div className='row'>
              <p className='card-author text-muted mr-1 mb-0'>by {author}</p>
              <Link to={`/${category}`}>
              <p className='card-category mb-0'>| {category}</p>
              </Link>
            </div>
          </div>
          <p className='card-timestamp text-muted'>{formatDate(timestamp)}</p>
          <Link to={`/${category}/${id}`}>
          <h5 className='card-title' style={{color: '#5B86E5'}}>{title}</h5>
          </Link>
          <p className='card-text'>{body}</p>
          <hr></hr>
          <div className='container'>
            <div className='row'>
                <TiHeartFullOutline
                  color='#5B86E5'
                  className='heart-up'
                  onClick={this.handleUpVote}
                />
                <p className='mx-2 text-muted'>{voteScore}</p>
                <TiHeartHalfOutline
                  color='#5B86E5'
                  className='heart-down'
                  onClick={this.handleDownVote}
                />
              <p className='ml-auto mr-2 text-muted'>{commentCount}</p>
              <TiMessage
                color='#5B86E5'
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

export default connect(mapStateToProps)(Post)
