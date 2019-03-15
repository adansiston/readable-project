import { combineReducers } from 'redux'

import authedUser from './authedUser'
import categories from './categories'
import comments from './comments'
import posts from './posts'



export default combineReducers({	
  authedUser,
  categories,
  comments,
  posts,
})
