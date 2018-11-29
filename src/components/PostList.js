import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiHeartOutline } from 'react-icons/ti/index'
import { Link } from 'react-router-dom'

class Post extends Component {
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
              <TiHeartOutline color='#e0245e' className='icon text-muted mr-1'/>
              <p className='card-vote-score mr-2 text-muted'>{voteScore}</p>
              <p className='card-comment-count ml-auto text-muted'>{commentCount} comments</p>
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
