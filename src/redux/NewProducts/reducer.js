import { FETCH_NEW_PRODUCTS_SUCCESS } from './types' 

const initialState = {
    products: []
}

const newProductsReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_NEW_PRODUCTS_SUCCESS: return {
            ...state,
            products: action.payload
        }
        default: return state
    }
}

export default newProductsReducer