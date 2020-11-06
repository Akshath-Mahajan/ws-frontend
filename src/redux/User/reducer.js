import { LOGIN_SUCCESS, LOGOUT } from './types'
const initialState = {
    username: localStorage.getItem('username'),
    icon: localStorage.getItem('icon'),
    token: localStorage.getItem('token'),
    numOfItemsInCart: localStorage.getItem('numOfItemsInCart'),
    numOfItemsInWishlist: localStorage.getItem('numOfItemsInWishlist'),
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS: {
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('numOfItemsInWishlist', action.payload.numOfItemsInWishlist)
            localStorage.setItem('numOfItemsInCart', action.payload.numOfItemsInCart)
            return {
                ...state,
                token: action.payload.token,
                username:action.payload.username,
                numOfItemsInCart: action.payload.numOfItemsInCart,
                numOfItemsInWishlist: action.payload.numOfItemsInWishlist
            }
        }
        case LOGOUT: {
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            localStorage.removeItem('numOfItemsInCart')
            localStorage.removeItem('numOfItemsInWishlist')
            return {
                ...state,
                username: localStorage.getItem('username'),
                icon: localStorage.getItem('icon'),
                token: localStorage.getItem('token'),
                numOfItemsInCart: localStorage.getItem('numOfItemsInCart'),
                numOfItemsInWishlist: localStorage.getItem('numOfItemsInWishlist'), 
            }
        }
        default: return state
    }
}

export default userReducer;