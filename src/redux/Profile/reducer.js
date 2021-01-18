import { CHANGE_PANE, FETCH_ADDRESS_SUCCESS, DA_OPEN_NEW_ADDRESS_FORM, DA_DELETE_ADDRESS, DA_SAVE_EDIT_ADDRESS, DA_SAVE_NEW_ADDRESS, DA_CANCEL_ADD_NEW, O_FETCH_ORDERS_SUCCESS, P_FETCH_PAYMENTS_SUCCESS, R_FETCH_REFUNDS_SUCCESS, O_TOGGLE_LOADING, DA_TOGGLE_LOADING } from './types'

const initialState = {
    deliveryAddress: {addresses: [], addingAddress: false, loading: false},
    orders: {orders: [], openOrderId: -1, openOrderIdx: -1, loading: false},
    pane: 0,
}

const profileReducer = (state = initialState, action) =>{
    switch(action.type){
        case CHANGE_PANE: return {
            ...state,
            pane: action.payload
        }
        case FETCH_ADDRESS_SUCCESS: return {
            ...state,
            deliveryAddress: {...state.deliveryAddress, addresses: action.payload}
        }
        case DA_OPEN_NEW_ADDRESS_FORM: return {
            ...state,
            deliveryAddress: {...state.deliveryAddress, addingAddress: true}
        }
        case DA_DELETE_ADDRESS: return {
            ...state,
            deliveryAddress: {...state.deliveryAddress, addresses: state.deliveryAddress.addresses.filter(item => item.id !== action.payload)}
        }
        case DA_SAVE_EDIT_ADDRESS: return {
            ...state,
            deliveryAddress: {
                ...state.deliveryAddress, 
                addresses: state.deliveryAddress.addresses.map(item=> 
                    (item.id === action.payload.id)? action.payload : item
                )
            }
        }
        case DA_SAVE_NEW_ADDRESS: return {
            ...state,
            deliveryAddress: {
                ...state.deliveryAddress,
                addresses: [...state.deliveryAddress.addresses, action.payload],
                addingAddress: false,
            }
        }
        case DA_CANCEL_ADD_NEW: return {
            ...state,
            deliveryAddress: {...state.deliveryAddress, addingAddress: false}
        }
        case DA_TOGGLE_LOADING: return {
            ...state, 
            deliveryAddress: {...state.deliveryAddress, loading: !state.deliveryAddress.loading}
        }
        case O_FETCH_ORDERS_SUCCESS: return {
            ...state,
            orders: {...state.orders, orders: action.payload}
        }
        case O_TOGGLE_LOADING: return {
            ...state, 
            orders: {...state.orders, loading: !state.orders.loading}
        }
        default: return state
    }
}

export default profileReducer