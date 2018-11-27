import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentsList from './CommentsList'

class CommentsDashboard extends Component {
  render() {
    return(
      <div>
        <ul>
          {this.props.postIds.map((id) => (
            <li key={id}>
              <PostList id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// Pega os ids dos posts e ordena pela data (timestamp)
function mapStateToProps ({ comments }) {
  return {
    postIds: Object.keys(posts)
      .sort((a,b) => posts[b].timestamp - posts[a].timestamp)
  }
}

export default connect(mapStateToProps)(CommentsDashboard)
