import axios from 'axios'
import { FETCH_HOME_SUCCESS } from './types'
import { DOMAIN } from '../../settings'
const fetchHomeSuccess = (data) => {
    return {
        type: FETCH_HOME_SUCCESS,
        payload: data
    }
}

const fetchHome = () => (dispatch) => {
    axios.get(`${DOMAIN}/api/home/`)
    .then(res => dispatch(fetchHomeSuccess(res.data)))
}

export {fetchHome}