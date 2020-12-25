import { CHANGE_PANE, FETCH_ADDRESS_SUCCESS, DA_OPEN_NEW_ADDRESS_FORM, DA_DELETE_ADDRESS, DA_SAVE_EDIT_ADDRESS, DA_SAVE_NEW_ADDRESS, DA_CANCEL_ADD_NEW } from './types'

const initialState = {
    deliveryAddress: {addresses: [], addingAddress: false},
    orders: {orders: [], openOrderId: -1, openOrderIdx: -1},
    payments: {payments: [], refunds:[]},
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
        default: return state
    }
}

export default profileReducer