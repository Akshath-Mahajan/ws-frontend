import { combineReducers } from 'redux';
import userReducer from './User/reducer'
import cartReducer from './Cart/reducer'
import wishlistReducer from './Wishlist/reducer'
import trendingReducer from './Trending/reducer';
import collectionReducer from './Collection/reducer'
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    trending: trendingReducer,
    collection: collectionReducer,
})


export default rootReducer