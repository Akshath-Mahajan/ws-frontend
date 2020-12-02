const { CHANGE_PANE } = require("./types")

const initialState = {
    profileInfo: {
        fname: "", lname: "", mobile: "", email: "",
        editing: {fname: false, lname: false, mobile: false, email: false}
    },
    deliveryAddress: {addresses: []},
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