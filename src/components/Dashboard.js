import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PostList from './PostList'
import { handleGetAllPosts } from '../actions/posts'

class Dashboard extends Component {
  componentDidMount () {
		this.props.dispatch(handleGetAllPosts(this.props.category))
	}

	componentDidUpdate (prevProps) {
		if (this.props.category !== prevProps.category) {
			this.props.dispatch(handleGetAllPosts(this.props.category))
		}
	}

  render() {
    return(
      <div>
        <div className='card mt-2'>
          <div className='card-body'>
            <div className='container'>
              <div className='row'>
                <h6 className='pt-2'>Filter by</h6>
                <select className='form-control col-5 ml-2 mb-3'>
                  <option>Default select</option>
                </select>
                <Link to={'/new-post'} className='ml-auto'>
                <button className='btn btn-primary'>New Post</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
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
function mapStateToProps ({ posts }, props) {
  const { category } = props.match.params
	const { pathname } = props.location

  return {
    postIds: Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp),
    category,
  	pathname,
  }
}

export default connect(mapStateToProps)(Dashboard)
