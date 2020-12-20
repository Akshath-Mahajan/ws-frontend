import { CHANGE_PRICE_RANGE, CHANGE_RATING, CLEAR_FILTERS, SORT_BY, TOGGLE_P_OPEN, TOGGLE_R_OPEN, TOGGLE_S_OPEN } from "./types"

const initialState = {
    sortBy: "",
    priceRange: [0, 10000],
    rating: 0,
    rOpen: false,
    pOpen: false,
    sOpen: false,
}

const filterReducer = (state=initialState, action) => {
    switch(action.type){
        case SORT_BY: return {
            ...state,
            sortBy: action.payload,
        }
        case CHANGE_PRICE_RANGE: return {
            ...state,
            priceRange: action.payload
        }
        case CHANGE_RATING: return {
            ...state,
            rating: action.payload,
        }
        case CLEAR_FILTERS: return { ...initialState }
        case TOGGLE_R_OPEN: return {...state, rOpen: !state.rOpen}
        case TOGGLE_P_OPEN: return {...state, pOpen: !state.pOpen}
        case TOGGLE_S_OPEN: return {...state, sOpen: !state.sOpen}
        default: return state
    }
}

export default filterReducer