import { combineReducers } from 'redux';
import userReducer from './User/reducer'
import cartReducer from './Cart/reducer'
import wishlistReducer from './Wishlist/reducer'
import trendingReducer from './Trending/reducer';
import collectionReducer from './Collection/reducer'
import newProductsReducer from './NewProducts/reducer';
import profileReducer from './Profile/reducer'
import filterReducer from './Filters/reducer'
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    trending: trendingReducer,
    collection: collectionReducer,
    new: newProductsReducer,
    profile: profileReducer,
    filter: filterReducer
})



export default rootReducer