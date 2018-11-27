import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiHeartOutline } from 'react-icons/ti/index'

class CommentsList extends Component {
  render() {

    const { comment } = this.props

    const {
      author, timestamp, body, voteScore
    } = comment

    console.log(comment)

    return(
      <div>
          <div className='card-body'>
            <p className='card-author text-muted mr-1 mb-0'>by {author}</p>
            <p className='card-timestamp text-muted'>{formatDate(timestamp)}</p>
            <p className='card-text'>{body}</p>
            <div className='container'>
              <div className='row'>
                <TiHeartOutline color='#e0245e' className='icon text-muted mr-1 mb-0'/>
                <p className='card-vote-score mr-2 text-muted mb-0'>{voteScore}</p>
              </div>
            </div>
          </div>
          <hr className='mb-0'></hr>
        </div>
    )
  }
}

function mapStateToProps ({ comments }, { id }) {
  const comment = comments[id]

  return {
    comment
  }
}

export default connect(mapStateToProps)(CommentsList)
