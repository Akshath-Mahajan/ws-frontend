const { CHANGE_PANE, PI_EDIT_EMAIL, PI_EDIT_MOBILE, SAVE_PI } = require("./types")

const initialState = {
    deliveryAddress: {addresses: [], editingAddressIdx: -1, editingAddressId: -1},
    passwordReset: {password:"", newPassword: "", confirmNewPassword: ""},
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
        default: return state
    }
}

export default profileReducer