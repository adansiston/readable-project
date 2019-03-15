import { RECEIVE_CATEGORIES } from '../actions/categories'

export default function categories (state = {}, action) {	// começa vazio
  switch(action.type) {
    case RECEIVE_CATEGORIES :
      return {
        ...state,		//vai retornar o estado que já estava
        ...action.categories	// mais as ações dele
      }
    default :
      return state
  }
}
