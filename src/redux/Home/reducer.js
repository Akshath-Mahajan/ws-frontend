import { FETCH_HOME_SUCCESS } from "./types"

const initialState = {
    trending:[], new: [], collection: []
}
const homeReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_HOME_SUCCESS: return {
            ...state,
            trending: action.payload.trending,
            new: action.payload.new,
            collection: action.payload.collection
        }
        default: return state
    }
}

export default homeReducer