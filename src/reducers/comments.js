import { SCORE_COMMENTS, RECEIVE_COMMENTS } from '../actions/comments'

export default function comments(state = {}, action) {	// começa vazio
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,		//vai retornar o estado que já estava
        ...action.comments	// mais as ações dele
      }
    

    case SCORE_COMMENTS:
      Object.getOwnPropertyNames(state).forEach(function (val, idx, array) {
        if (state[val].id === action.post.id) {
          action.comment.operation === 'upVote'
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
