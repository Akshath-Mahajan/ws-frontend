import { FETCH_COLLECTION_SUCCESS } from "./types"

const initialState = {
    products:[]
}
const collectionReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_COLLECTION_SUCCESS: return {
            ...state,
            products: action.payload
        }
        default: return state
    }
}

export default collectionReducer