import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiHeartOutline } from 'react-icons/ti/index'
import { Link } from 'react-router-dom'

class Post extends Component {
  render() {

    const { post } = this.props

    const {
      author, category, timestamp, title, body, voteScore, commentCount
    } = post

    return(
      <div>
        <div className='card mt-2'>
          <div className='card-body'>
            <h3 className='card-title'>{title}</h3>
            <div className='container'>
              <div className='row'>
                <p className='card-author text-muted mr-1 mb-0'>by {author}</p>
                <Link to={`/${category}`}>
                <p className='card-category mb-0'>| {category}</p>
                </Link>
              </div>
            </div>
            <p className='card-timestamp text-muted'>{formatDate(timestamp)}</p>
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
      </div>
    )
  }
}

function mapStateToProps ({ post }, { id }) {

  return {
    post
  }
}

export default connect(mapStateToProps)(Post)
