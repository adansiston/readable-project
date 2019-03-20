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
    post: {},
    update: false,
  }

  id = '';
  

  componentWillMount() {
    this.id = this.props.id
    CommentsAPI.getPost(this.id)
      .then(post => {
        this.setState(() => ({
          post
        }));
        CommentsAPI.getComments(this.id)
        .then(resp =>
          this.setState(() => ({
            comments: resp,
          })))
      });
  }

  componentDidMount() {
    console.log('this.post did', this.state.post)
    this.setState(() => ({
      showNewComment: false,
      newComment: {},
      commentText: '',
    }))

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
    newComment.parentId = this.state.post.id;
    newComment.timestamp = Date.now();
    newComment.deleted = false;
    newComment.voteScore = 1;


    handleAddComment(newComment)
    .then(
      this.setState(prevState => ({
        comments: [...prevState.comments, newComment]
      })),
      post = this.state.post,
      post.commentCount++,
      this.setState(() => ({
        post
      }))
    )

    this.setState(() => ({
      showNewComment: false,
      
    }))

    this.setState(() => ({
      update: !this.state.update
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
    
    let post = this.state.post;
    post.commentCount--;
    this.setState(() => ({
        post
      }))

    this.setState(() => ({
      update: !this.state.update
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
    const id = this.id;
    
    console.log('post no render', this.state.post);

    let comments = this.state.comments;
    comments.sort(function (a, b) { return b.voteScore - a.voteScore });
    return (
      <div>
        {console.log('post no return', this.state.post)}
        <Link to='/' >
          Home
        </Link>

        <Post update={this.state.update} key={this.state.post.id} post={this.state.post} edit='true' hideLink='false'/>
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
            <button type="button" onClick={() => { this.handleNewComment(this.post) }} >

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