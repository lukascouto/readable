import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import { handleGetAllPosts } from '../actions/posts'
import { GoRocket } from 'react-icons/go'

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

    const { posts } = this.props

    if (posts.length === 0) {
      return (
        <div className='container text-center text-muted mt-5'>
          <GoRocket style={{
            fontSize: '100px',
            color: '#B06AB3',
            margin: '20px'
            }}
          />
          <h2><span style={{color: '#B06AB3'}}>Wow! </span>No posts yet.</h2>
          <p>You can be the first! ;)</p>
        </div>
      )
    }

    return (
      <div>
        <div className='card mt-2'>
          <div className='card-body'>
            <div className='container'>
              <div className='row'>
                <h6 className='pt-2'>Filter</h6>
                <select className='form-control col-5 ml-2 mb-3'>
                  <option>Date</option>
                  <option>Vote</option>
                </select>
                <Link to={'/new-post'} className='ml-auto'>
                <button className='btn btn-primary'>New Post</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ul>
          {this.props.postIndex.map((index) => (
            <li key={index}>
              <Post id={index} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts }, props) {
  const { category } = props.match.params
	const { pathname } = props.location

  return {
    // Ordem crescente
    //postIds: Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp),

    // Ordem decrescente
    //postIds: Object.keys(posts).sort((a,b) => posts[a].timestamp - posts[b].timestamp),

    // Por voto crescente
    //postIds: Object.keys(posts).sort((a,b) => posts[a].voteScore - posts[b].voteScore),

    // Por voto decrescente
    postIndex: Object.keys(posts).sort((a,b) => posts[b].voteScore - posts[a].voteScore),
    category,
  	pathname,
    posts
  }
}

export default connect(mapStateToProps)(Dashboard)
