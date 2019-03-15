import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import { handleAddComment, handleRemoveComment, handleEditComment } from '../actions/shared'
import * as CommentsAPI from '../utils/CommentsAPI'
import { Link } from 'react-router-dom'





class PostView extends Component {

  state = {
    comments: [],
    showNewComment: false,
    newComment: {},
    commentText: '',
  }


  componentDidMount() {
    this.setState(() => ({
      showNewComment: false,
      newComment: {},
      commentText: '',
    }))
    const { id } = this.props.match.params
    CommentsAPI.getComments(id)
      .then(resp =>
        this.setState(() => ({
          comments: resp,
        })))
  }


  showNewCommentInput = () => {
    this.setState(() => ({
      showNewComment: true,
      commentText: '',
    }))
  }

  handleNewComment = (post) => {
    let newComment = {};
    newComment.author = this.props.authedUser;
    newComment.body = this.state.commentText;
    let token = localStorage.token = Math.random().toString(36).substr(-8);
    newComment.id = token;
    newComment.parentId = post.id;
    newComment.timestamp = Date.now();
    newComment.deleted = false;
    newComment.voteScore = 0;


    handleAddComment(newComment)
    .then(
      this.setState(prevState => ({
        comments: [...prevState.comments, newComment]
      }))
    )


    this.setState(() => ({
      showNewComment: false,
    }))
    

  }

  handleCommentText = (e) => {
    const commentText = e.target.value;
    this.setState(() => ({
      commentText
    }))
  }
  handleDeleteComment = (comment) => {
    handleRemoveComment(comment)
    let comments = this.state.comments;
    for(var i = 0; i < comments.length; i++){
      if(comments[i].id === comment.id) {
        comments[i].deleted = true;
      }
    }
    this.setState(() => ({
      comments
    }))
  }

  handleEditComment = (comment) => {
    handleEditComment(comment)
  }

  handleChangeCommentScore = (c, operation) => {
    let comments = this.state.comments;
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].id === c.id) {
        operation === 'upVote'
        ? comments[i].voteScore++
        : comments[i].voteScore--
      }
    }
    this.setState(() => ({
      comments
    }))
  }


  render() {
    const { id } = this.props.match.params
    const { posts } = this.props;
    let post;

    Object.getOwnPropertyNames(posts).forEach(function (val, idx, array) {
      posts[val].id === id && (post = posts[val]);
    });

    let comments = this.state.comments;
    comments.sort(function (a, b) { return b.voteScore - a.voteScore });

    return (
      <div>
        <Link to='/' >
          Home
        </Link>

        <Post key={post.id} post={post} edit='true' hideLink='false'/>
        <br />
        {!this.state.showNewComment &&
          <button type="button" onClick={this.showNewCommentInput}>
            New Comment
        </button>
        }
        {this.state.showNewComment &&
          <div>
            <h3>New Comment</h3>
            <input placeholder="Type a cooment" className='inputCooment'
              value={this.state.commentText}
              onChange={this.handleCommentText}
            /><br></br>
            <button type="button" onClick={() => { this.handleNewComment(post) }} >

              Save
            </button>
          </div>
        }


        <br />
        <br />
        {this.state.comments.length > 0
          ? <h2>Comments</h2>
          : <h2>No comments</h2>
        }
        {comments.map((c) => {
          if(!c.deleted) {
              return <Comment key={c.id} comment={c} edit='true' userLogger={this.props.authedUser} onDeleteComment={() => { this.handleDeleteComment(c)}} onEditComment={() => { this.handleEditComment(c)}} onChangeCommentScore={(operation) => { this.handleChangeCommentScore(c, operation)}}/>
          } else {
            return null
          }
          
        })}
      </div>
    )
  }
}


function mapStateToProps(posts) {
  return (posts)
}
export default connect(mapStateToProps)(PostView)