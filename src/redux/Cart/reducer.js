import { FETCH_CART_SUCCESS, UPDATE_CART_SUCCESS, DELETE_CART_SUCCESS } from './types'
const initialState = {
    cart: {}
}
const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_CART_SUCCESS: return {
            ...state,
            cart: action.payload
        }
        case UPDATE_CART_SUCCESS: {
            let _cart = {... state.cart}
            _cart[action.payload.id] = action.payload
            return {
                ...state,
                cart: _cart
            }
        }
        case DELETE_CART_SUCCESS: {
            let _cart = {... state.cart}
            let id = action.product_id
            delete _cart[id]
            return {
                ...state,
                cart: _cart
            }
        }
        default: return state
    }
}

export default cartReducer