import React, { Component, Fragment } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddVote, handleDeletePost } from '../actions/posts'
import { formatDate } from '../utils/helpers'
import { FaTrash, FaPen, FaShareAlt, FaHeartbeat, FaHeart, FaComment } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown/with-html'
import FormPost from './FormPost'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'
import { Twitter, Facebook } from 'react-social-sharing'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class PostList extends Component {

  state = {
    postSelected: false,
    open: false,
    openShare: false,
    toHome: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleClickOpenShare = () => {
    this.setState({ openShare: true })
  }

  handleCloseShare = () => {
    this.setState({ openShare: false })
  }

  handleVote = (option) => {
    const { dispatch, post } = this.props
    dispatch(handleAddVote( post, option ))
  }

  handleEdit = () => {
    this.setState({ postSelected: true })
  }

  handleEditedCanceled = () => {
    this.setState({ postSelected: false })
  }

  // Fecha o Dialog, dispara a ação de deletar o post e passa true para toHome
  // No render recupera toHome e redireciona para o diretório raíz '/'
  handleDelete = () => {
    const { dispatch, post } = this.props
    this.setState({ open: false })
    dispatch(handleDeletePost(post))
    this.setState({ toHome: true })
  }

  render() {
    const { post, id } = this.props
    const { author, category, timestamp, title, body, voteScore, commentCount } = post

    // Se a ação de deletar o post foi disparada, redireciona para o diretório raíz '/'
    if (this.state.toHome === true) {
      return <Redirect to='/'/>
    }

    if (this.state.postSelected) {
      return (
        <div className="container container-edit-post-comment my-5 p-3">
          <h3 className="text-center text-muted mt-3 mb-5">Edit Post</h3>
          <FormPost
            id={id}
            onUpdatePost={this.handleEditedCanceled}
          />
        </div>
      )
    }

    return (
      <Fragment>
        <div className="card mt-2">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <Link to={`/${category}`} className="card-category">
                <button className="btn mb-3 py-1">{category}</button>
                </Link>
                <div className="ml-auto">
                  <div className="post-options px-3">
                    <FaPen
                      className="text-muted mr-3"
                      onClick={this.handleEdit}
                    />
                    <FaTrash
                      className="text-muted mr-3"
                      onClick={this.handleClickOpen}
                    />
                    <FaShareAlt
                      className="text-muted"
                      onClick={this.handleClickOpenShare}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Link to={`/${category}/${id}`}>
            <h5 className="card-title mb-1">{title}</h5>
            </Link>
            <p className="card-author text-muted">By <strong>{author}</strong> at {formatDate(timestamp)}</p>
            {/* Se o diretório for igual à '/', '/react', '/redux' ou 'udacity'
                Significa que está na Dashboard, então o body do post será reduzido para 30 caracteres + ...
            */}
            {this.props.location.pathname === '/' && '/react' && '/redux' && '/udacity' ?
              <p className="card-text text-muted">{body.substring(0,30)+"..."}</p> :
              /*
                Caso contrário, está na PostPage, então o body deve ser exibido completo
                e reconhecer Markdown para estilizar o texto.
               */
              <ReactMarkdown
                source={body}
                escapeHtml={false}
                className="card-text text-muted"
              />}
            <hr></hr>
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
                  <p className="ml-auto mr-2 text-muted">{commentCount}</p>
                  <FaComment
                    color="#B06AB3"
                    className="message"
                  />
              </div>
            </div>
          </div>
        </div>
        {/* Mensagem exibida quando clica em deteletar um post */}
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
              Are you sure you want to delete this post?
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
        {/* Exibe o Dialog com as redes sociais para compartilhamento do post */}
        <Dialog
          open={this.state.openShare}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Twitter link="https://github.com" />
            <Facebook link={window.location.href} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseShare} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}
// Lembrar de só compartilhar na página do post

function mapStateToProps ({ posts }, { id }) {
  const post = posts[id]

  return {
    id,
    post,
  }
}

export default withRouter(connect(mapStateToProps)(PostList))
