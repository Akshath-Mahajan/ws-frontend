import { FETCH_TRENDING_SUCCESS, TOGGLE_TRENDING_LOADING } from "./types"

const initialState = {
    products:[],
    loading: false
}
const trendingReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_TRENDING_SUCCESS: return {
            ...state,
            products: action.payload
        }
        case TOGGLE_TRENDING_LOADING: return {...state, loading: !state.loading}
        default: return state
    }
}

export default trendingReducer