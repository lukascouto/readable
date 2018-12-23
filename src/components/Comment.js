import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleDeleteComment, handleAddVote } from '../actions/comments'
import { formatDate } from '../utils/helpers'
import { FaTrash, FaPen, FaHeartbeat, FaHeart } from 'react-icons/fa'
import { Animated } from "react-animated-css"
import FormComment from './FormComment'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class CommentsList extends Component {

  state = {
    commentSelected: false,
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleVote = (option) => {
    const { dispatch, comment } = this.props
    dispatch(handleAddVote( comment, option ))
  }

  // Seta um true após clicar em editar um comentário
  // Entra no if do render e com isso abre o FormComment com o corpo preenchido
  handleEdit = () => {
    this.setState({ commentSelected: true })
  }

  // Função chamada após editar/cancelar edição de um comentário
  // commentSelected recebe false para não renderizar o formulário após uma edição/cancelamento
  handleEditedCanceled = () => {
    this.setState({ commentSelected: false })
  }

  handleDelete = () => {
    const { dispatch, comment } = this.props
    dispatch(handleDeleteComment(comment))
  }

  render() {
    const { id, comment } = this.props
    const { author, timestamp, body, voteScore } = comment

    // Condição para abrir o formulário para edição de comentário
    if (this.state.commentSelected) {
      return (
        <Animated animationIn="fadeInRightBig" isVisible={true}>
          <div className="container container-edit-post-comment my-5 p-3">
            <FormComment
              id={id}
              onUpdateComment={this.handleEditedCanceled}
            />
          </div>
        </Animated>
      )
    }

    return (
      <Fragment>
        <div className="card-body">
          <hr className="mt-0"></hr>
          <div className="container">
            <div className="row">
              <p className="card-author text-muted">By <strong>{author}</strong> at {formatDate(timestamp)}</p>
              <div className="ml-auto">
                <div className="post-options pl-4">
                  <FaPen
                    className="text-muted mr-3"
                    onClick={this.handleEdit}
                  />
                  <FaTrash
                    className="text-muted mr-3"
                    onClick={this.handleClickOpen}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="card-text text-muted">{body}</p>
          <div className="container">
            <div className="row">
              <FaHeartbeat
                color="#B06AB3"
                className="heart-up"
                onClick={() => this.handleVote("upVote")}
              />
              <p className="mx-2 text-muted">{voteScore}</p>
              <FaHeart
                color="#B06AB3"
                className="heart-down"
                onClick={() => this.handleVote("downVote")}
              />
            </div>
          </div>
        </div>
        {/* Mensagem exibida quando clica em deteletar um comentário */}
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this comment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

function mapStateToProps ({ comments }, { id }) {
  const comment = comments[id]

  return {
    id,
    comment
  }
}

export default connect(mapStateToProps)(CommentsList)
