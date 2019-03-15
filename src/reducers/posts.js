import { RECEIVE_POSTS, ADD_POST, EDIT_POST, REMOVE_POST, SCORE_POST } from '../actions/posts'

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...action.posts
      }
    case ADD_POST:
      const { post } = action
      let indice = [];
      Object.getOwnPropertyNames(state).forEach(function (val, idx, array) {
        indice.push(val);
      });
      let newInd = (indice.length);
      state[newInd] = post
      return {
        ...state,
      }

    case EDIT_POST:
      Object.getOwnPropertyNames(state).forEach(function (val, idx, array) {
        if (state[val].id === action.post.id) {
          state[val].title = action.post.title;
          state[val].body = action.post.body;
        }
      });
      return {
        ...state,
      }


    case REMOVE_POST:
      Object.getOwnPropertyNames(state).forEach(function (val, idx, array) {
        if (state[val].id === action.post.id) {
          state[val].deleted = true;
        }
      });
      return {
        ...state,
      }


    case SCORE_POST:
      Object.getOwnPropertyNames(state).forEach(function (val, idx, array) {
        if (state[val].id === action.post.id) {
          action.post.operation === 'upVote'
          ? state[val].voteScore++
          : state[val].voteScore--
        }
      });
      return {
        ...state,
      }

    default:
      return state
  }
}
