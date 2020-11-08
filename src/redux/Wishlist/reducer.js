import { FETCH_WISHLIST_SUCCESS } from "./types";

const initialState = {
    wishlist:[]
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_WISHLIST_SUCCESS:return {
            ...state,
            wishlist: action.payload
        }
        default: return state
    }
}

export default reducer;