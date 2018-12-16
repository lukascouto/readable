import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import { handleGetAllPosts } from '../actions/posts'
import { GoRocket } from 'react-icons/go'

class Dashboard extends Component {

  state = {
    filter: 'date',
    order: 'crescente',
    indexes: []
  }

  componentDidMount () {
		this.props.dispatch(handleGetAllPosts(this.props.category))
	}

	componentDidUpdate (prevProps) {
    /*

    if (filter === 'date' && order === 'crescente') {
      //postIndexes = Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp)
    }

    if (filter === 'date' && order === 'decrescente') {
      //postIndexes = Object.keys(posts).sort((a,b) => posts[a].timestamp - posts[b].timestamp)
    }

    if (filter === 'vote' && order === 'crescente') {
      //postIndexes = Object.keys(posts).sort((a,b) => posts[a].voteScore - posts[b].voteScore)
    }

    if (filter === 'vote' && order === 'decrescente') {
      //postIndexes = Object.keys(posts).sort((a,b) => posts[b].voteScore - posts[a].voteScore)
    }

    */

		if (this.props.category !== prevProps.category) {
			this.props.dispatch(handleGetAllPosts(this.props.category))
		}
	}

  changeFilter = (event) => {
    this.setState({
      filter: event
    })
  }

  changeOrder = (event) => {
    const { posts } = this.props
    if (event === 'crescente') {
      this.setState({
        indexes: Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp)
      })
      console.log(this.state.indexes)
    }

    if ( event === 'decrescente') {
      this.setState({
        indexes: Object.keys(posts).sort((a,b) => posts[a].timestamp - posts[b].timestamp)
      })
      console.log(this.state.indexes)
    }
  }
/*
  changeOrder = (event) => {
    this.setState({
      order: event
    })
  }
*/

  render() {

    const { posts, postIndexes } = this.props
    const { indexes } = this.state

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
                    onChange={(event) => this.changeFilter(event.target.value)}
                >
                    <option value="filter" disabled>List by...</option>
                    <option value="date">Date</option>
                    <option value="vote">Vote</option>
                </select>
              </div>
              <div className='row'>
                <h6 className='pt-2'>Order by</h6>
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
          {indexes.map((postIndex) => (
            <li key={postIndex}>
              <Post id={postIndex} />
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
    //postIndexes: Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp),

    // Ordem decrescente
    //postIndexes: Object.keys(posts).sort((a,b) => posts[a].timestamp - posts[b].timestamp),

    // Por voto crescente
    //postIndexes: Object.keys(posts).sort((a,b) => posts[a].voteScore - posts[b].voteScore),

    // Por voto decrescente
    //postIndexes: Object.keys(posts).sort((a,b) => posts[b].voteScore - posts[a].voteScore),

    postIndexes: Object.keys(posts).sort((a,b) => posts[b].timestamp - posts[a].timestamp),
    category,
  	pathname,
    posts
  }
}

export default connect(mapStateToProps)(Dashboard)
