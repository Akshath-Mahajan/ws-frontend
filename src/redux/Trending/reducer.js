import { FETCH_TRENDING_SUCCESS } from "./types"

const initialState = {
    products:{}
}
const trendingReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_TRENDING_SUCCESS: return {
            ...state,
            products: action.payload
        }
        default: return state
    }
}

export default trendingReducer