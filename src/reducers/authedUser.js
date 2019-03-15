import { SET_AUTHED_USER } from '../actions/authedUser'

export default function authedUser (state = null, action) {  // o estado inicial é nulo
  switch (action.type) {
    case SET_AUTHED_USER :
      return action.user		// retorna o id do usuário logado
    default :
      return state		// se for uma ação estranha apenas retorna o que já estava. 
  }
}
