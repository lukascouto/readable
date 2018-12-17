import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import { handleGetAllPosts } from '../actions/posts'
import { handleOptionPost, handleOrderPost } from '../actions/filter'
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

  changeOption = (event) => {
    this.props.dispatch(handleOptionPost(event))
  }

  changeOrder = (event) => {
    this.props.dispatch(handleOrderPost(event))
  }

  render() {
    const { posts, postIndexes } = this.props

    if (posts.length === 0) {
      return (
        <div className='container text-center text-muted mt-5'>
          <GoRocket style={{
            fontSize: '100px',
            color: '#B06AB3',
            margin: '20px'
            }}
          />
          <h2><span style={{color: '#B06AB3'}}>Hey! </span>No posts yet.</h2>
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
                <select
                    className='form-control col-5 ml-2 mb-3'
                    onChange={(event) => this.changeOption(event.target.value)}
                >
                    <option value="filter" disabled>List by...</option>
                    <option value="date">Date</option>
                    <option value="vote">Vote</option>
                </select>
              </div>
              <div className='row'>
                <h6 className='pt-2'>Order</h6>
                <select
                    className='form-control col-5 ml-2 mb-3'
                    onChange={(event) => this.changeOrder(event.target.value)}
                >
                    <option value="crescente">Crescente</option>
                    <option value="decrescente">Decrescente</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <ul>
          {postIndexes.map((index) => (
            <li key={index}>
              <Post id={index} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts, filter }, props) {
  const { category } = props.match.params
	const { pathname } = props.location

  let indexes = []

  if (filter.option === 'date' && filter.order === 'crescente') {
    indexes = Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp)
  }

  if (filter.option === 'date' && filter.order === 'decrescente') {
    indexes = Object.keys(posts).sort((a,b) => posts[a].timestamp - posts[b].timestamp)
  }

  if (filter.option === 'vote' && filter.order === 'crescente') {
    indexes = Object.keys(posts).sort((a,b) => posts[a].voteScore - posts[b].voteScore)
  }

  if (filter.option === 'vote' && filter.order === 'decrescente') {
    indexes = Object.keys(posts).sort((a,b) => posts[b].voteScore - posts[a].voteScore)
  }

  return {
    postIndexes: indexes,
    category,
  	pathname,
    posts,
    filter
  }
}

export default connect(mapStateToProps)(Dashboard)
