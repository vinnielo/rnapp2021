  
import { combineReducers } from 'redux';
import auth from './auth_reducers';
import stories from './story_reducers'

const rootReducer = combineReducers({
    auth,
    stories
})

export default rootReducer;