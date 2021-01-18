import { FETCH_COLLECTION_SUCCESS, TOGGLE_COLLECTION_LOADING } from "./types"

const initialState = {
    products:[], loading: false
}
const collectionReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_COLLECTION_SUCCESS: return {
            ...state,
            products: action.payload
        }
        case TOGGLE_COLLECTION_LOADING: return {...state, loading: !state.loading}
        default: return state
    }
}

export default collectionReducer