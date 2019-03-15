import * as CommentsAPI from '../utils/CommentsAPI'

import { setAuthedUser } from '../actions/authedUser'
import { receivePosts, addPost, editPost, removePost, changePostScore } from '../actions/posts'
import { receiveCategories } from '../actions/categories'
//import { receiveComments } from '../actions/comments'


export function handleAddComment(comment) {
  return CommentsAPI.addComment(comment)
}

export function handleRemoveComment(comment) {
  return CommentsAPI.removeComment(comment.id);
}
export function handleEditComment(comment) {
  return CommentsAPI.editComment(comment);
}

export function handleRemovePost(post) {
  return (dispatch) => {
    return CommentsAPI.removePost(post.id)
      .then(resp => {
        dispatch(removePost(post))
      });
  }
}


export function handleCommentScore(operation, id) {
  return (dispatch) => {
    return CommentsAPI.editCommentScore(operation, id)
      .then(resp => {
        let comment ={};
        comment.id = id;
        comment.operation = operation;
      });
  }
}



export function handlePostScore(operation, id) {
  return (dispatch) => {
    return CommentsAPI.editPostScore(operation, id)
      .then(resp => {
        let post ={};
        post.id = id;
        post.operation = operation;
        dispatch(changePostScore(post))
      });
  }
}

export function handleEditPost(post) {
  return (dispatch) => {
    return CommentsAPI.editPost(post)
      .then(resp => {
        dispatch(editPost(post))
      });
  }
}


export function handleInitialPosts() {
  return (dispatch) => {
    return CommentsAPI.getPosts()
      .then(resp => {
        dispatch(receivePosts(resp));
      });
  }
}

export function handleGetComments(id) {
  return (dispatch) => {
    return CommentsAPI.getComments(id)
      .then(({ resp }) => {
        return (resp)
      })
  }
}


export function handleInitialCategories() {
  return (dispatch) => {
    return CommentsAPI.getCategories()
      .then(({ categories }) => {
        dispatch(receiveCategories(categories))
      })
  }
}

export function handleSetAuthedUser(user) {
  return (dispatch) => {
    dispatch(setAuthedUser(user))
  }
}

export function handleAddPost(ind, post) {
  return (dispatch) => {
    CommentsAPI.addPost(post)
    .then(dispatch(addPost(post)))
  }
}





