import { FETCH_CART_SUCCESS } from './types'
const initialState = {
    cart: []
}
const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_CART_SUCCESS: return {
            ...state,
            cart: action.payload
        }
        default: return state
    }
}

export default cartReducer