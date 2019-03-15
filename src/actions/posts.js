export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'  
export const EDIT_POST = 'EDIT_POST'  
export const REMOVE_POST = 'REMOVE_POST'
export const SCORE_POST = 'SCORE_POST'

export function changePostScore (post) {   // ação nova
  return {
    type: SCORE_POST,
    post,
  }
}

export function editPost (post) {   // ação nova
  return {
    type: EDIT_POST,
    post,
  }
}

export function removePost (post) {   // ação nova
  return {
    type: REMOVE_POST,
    post,
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}




export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}