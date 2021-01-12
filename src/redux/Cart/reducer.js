import { LOGIN_SUCCESS } from '../User/types'
import { ADD_CART_DELETE_WISHLIST_SUCCESS } from '../Wishlist/types'
import { FETCH_CART_SUCCESS, UPDATE_CART_SUCCESS, DELETE_CART_SUCCESS } from './types'
const initialState = {
    cart: {},
    num: 0
}
const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS: return {
            ...state,
            num: action.payload.numOfItemsInCart
        }
        case FETCH_CART_SUCCESS: return {
            ...state,
            cart: action.payload,
            num: Object.keys(action.payload).length
        }
        case UPDATE_CART_SUCCESS: {
            let _cart = {...state.cart}
            _cart[action.payload.item_id].quantity = action.payload.quantity
            return {
                ...state,
                cart: _cart
            }
        }
        case DELETE_CART_SUCCESS: {
            let _cart = {...state.cart}
            let id = action.item_id
            delete _cart[id]
            return {
                ...state,
                cart: _cart,
                num: state.num - 1
            }
        }
        case ADD_CART_DELETE_WISHLIST_SUCCESS: return {
            ...state,
            num: state.num+1
        }
        default: return state
    }
}

export default cartReducer