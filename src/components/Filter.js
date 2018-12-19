import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleOptionPost, handleOrderPost } from '../actions/filter'

class Filter extends Component {

  state = {
    order: true
  }

  changeOption = (event) => {
    this.props.dispatch(handleOptionPost(event))
  }

  changeOrder = () => {
    //ASC
    //DESC
    this.setState({order: !this.state.order}, () => {
      this.props.dispatch(handleOrderPost(this.state.order))
    })
  }

  render() {
    return (
      <div className='card-filter py-3'>
        <div className='card-body mb-3'>
          <div className='container'>
            <div className='row'>
              <div className='col-4 pl-0 pr-0'>
                <select
                    className='form-control'
                    onChange={(event) => this.changeOption(event.target.value)}
                >
                    <option value="filter" disabled>List by...</option>
                    <option value="date">Date</option>
                    <option value="vote">Vote</option>
                    <option value="comments">Comments</option>
                </select>
              </div>
              <div className='col-2 pl-0'>
                <button
                  className='btn btn-primary'
                  onClick={this.changeOrder}
                > {this.state.order === true ? 'Asc' : 'Desc'}
                </button>
              </div>
              <div className='col-6 pl-0 pr-0'>
                <input
                  className='form-control'
                  placeholder="Search..."
                  name="search"

                  //value={search}
                  //onChange={this.handleChange}

                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Filter)
