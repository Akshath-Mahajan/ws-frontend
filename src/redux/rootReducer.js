import { combineReducers } from 'redux';
import userReducer from './User/reducer'
import cartReducer from './Cart/reducer'
import wishlistReducer from './Wishlist/reducer'
import trendingReducer from './Trending/reducer';
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    trending: trendingReducer,
})


export default rootReducer