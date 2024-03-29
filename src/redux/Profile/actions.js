import { CHANGE_PANE, FETCH_ADDRESS_SUCCESS, DA_OPEN_NEW_ADDRESS_FORM, DA_SAVE_NEW_ADDRESS, DA_DELETE_ADDRESS, DA_SAVE_EDIT_ADDRESS, DA_CANCEL_ADD_NEW, O_FETCH_ORDERS_SUCCESS, P_FETCH_PAYMENTS_SUCCESS, R_FETCH_REFUNDS_SUCCESS, DA_TOGGLE_LOADING, O_TOGGLE_LOADING } from './types'
import axios from 'axios'
import { DOMAIN } from '../../settings'
const changePane = (id) => {
    return {
        type: CHANGE_PANE,
        payload : id
    }
}

const fetchAddressSuccess = (data) => ({type: FETCH_ADDRESS_SUCCESS, payload: data})
const fetchAddress = () => (dispatch) => {
    dispatch({type: DA_TOGGLE_LOADING})
    axios.get(DOMAIN+'/api/address', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
        .then(res => {
            dispatch(fetchAddressSuccess(res.data))
            dispatch({type: DA_TOGGLE_LOADING})
        })
} 

const openAddressForm = () => {
    return {type:DA_OPEN_NEW_ADDRESS_FORM}
}

const saveAddress = (data) => (dispatch) => {
    if(data.id)
        dispatch({type: DA_SAVE_EDIT_ADDRESS, payload: data})    
    //add else set loading
    axios.post(`${DOMAIN}/api/address/`, data, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res=>{
        if(!data.id) // we are adding a new one here
            dispatch({type: DA_SAVE_NEW_ADDRESS, payload: res.data})
    })
}
const deleteAddress = (add_id) => (dispatch) => {
    dispatch({type: DA_DELETE_ADDRESS, payload: add_id})
    axios.delete(DOMAIN+"/api/address", {
        headers: {Authorization: "Token "+localStorage.getItem('token')},
        data: {pk: add_id}
    });
}

const cancelNewAddress = () => ({type: DA_CANCEL_ADD_NEW})

const fetchOrdersSuccess = (data) => {
    return {
        type: O_FETCH_ORDERS_SUCCESS,
        payload: data
    }
}
const fetchOrders = () => (dispatch) => {
    dispatch({type: O_TOGGLE_LOADING})
    axios.get(DOMAIN+'/api/user-orders', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res => {
        dispatch(fetchOrdersSuccess(res.data))
        dispatch({type: O_TOGGLE_LOADING})   
    })
}

// const fetchPaymentsSuccess = (data) => ({type: P_FETCH_PAYMENTS_SUCCESS, payload: data})
// const fetchPayments = () => (dispatch) => {
//     axios.get(DOMAIN+'/api/user-payments', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
//     .then(res => dispatch(fetchPaymentsSuccess(res.data)))
// }

/*
Axios.get(DOMAIN+'/api/user-refunds', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
        .then(res=>{
            console.log(res.data)
            setData(res.data)
        })
*/
// const fetchRefundsSuccess = (data) => ({type: R_FETCH_REFUNDS_SUCCESS, payload: data})
// const fetchRefunds = () => (dispatch) => {
//     axios.get(DOMAIN+'/api/user-refunds', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
//     .then(res => dispatch(fetchRefundsSuccess(res.data)))
// }
export { changePane, fetchAddress, openAddressForm, deleteAddress, saveAddress, cancelNewAddress, fetchOrders }