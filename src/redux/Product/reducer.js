import { ADD_TO_CART, ADD_TO_WISHLIST, CHANGE_PRODUCT_COMMENT, CHANGE_PRODUCT_RATING, CLEAR_PRODUCT, DELETE_REVIEW, EDIT_REVIEW, FETCH_PRODUCT_DETAILS_SUCCESS, SAVE_REVIEW, TOGGLE_PRODUCT_INDIVIDUAL_LOADING } from "./types"

const initialState = {
    product: {},
    images: [],
    reviews: [],
    userReview: {},
    editingReview: true,
    inCart: false, inWishlist: false, loading: false
}
const productReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_PRODUCT_DETAILS_SUCCESS: return {
            ...state,
            product: action.payload.product,
            images: action.payload.images,
            reviews: action.payload.reviews,
            userReview: action.payload.user_review,
            editingReview: action.payload.user_review?action.payload.user_review.id?false:true : false,
            inCart: action.payload.in_cart?true:false,
            inWishlist: action.payload.in_wishlist?true:false
        }
        case CLEAR_PRODUCT: return { ...initialState }
        case CHANGE_PRODUCT_COMMENT: return {
            ...state,
            userReview: {...state.userReview, comment: action.payload}
        }
        case CHANGE_PRODUCT_RATING: return {
            ...state,
            userReview: {...state.userReview, rating: action.payload}
        }
        case SAVE_REVIEW: return {
            ...state,
            editingReview: false,
            userReview: {...state.userReview, user:action.payload}
        }
        case EDIT_REVIEW: return {
            ...state,
            editingReview: true
        }
        case DELETE_REVIEW: return {
            ...state,
            userReview: {},
            editingReview: true,
        }
        case ADD_TO_CART: return {
            ...state,
            inCart: true,
        }
        case ADD_TO_WISHLIST: return {
            ...state,
            inWishlist: true,
        }
        case TOGGLE_PRODUCT_INDIVIDUAL_LOADING: return {...state, loading: !state.loading}
        default: return state
    }
}

export default productReducer