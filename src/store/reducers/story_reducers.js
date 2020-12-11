
export default function(state={},action){
    switch(action.type){
        case 'GET_STORIES':
            return {...state, ...action.payload}
       
        default:
            return state
    }
}