import { combineReducers } from 'redux';
import userReducer from './User/reducer'
import cartReducer from './Cart/reducer'
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
})


export default rootReducer