import { FETCH_NEW_PRODUCTS_SUCCESS, TOGGLE_NEW_PRODUCTS_LOADING } from './types' 

const initialState = {
    products: [],
    loading: false,
}

const newProductsReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_NEW_PRODUCTS_SUCCESS: return {
            ...state,
            products: action.payload
        }
        case TOGGLE_NEW_PRODUCTS_LOADING: return {...state, loading: !state.loading}
        default: return state
    }
}

export default newProductsReducer