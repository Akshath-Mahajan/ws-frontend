import {CHANGE_PRICE_RANGE, SORT_BY, CHANGE_RATING, CLEAR_FILTERS, TOGGLE_R_OPEN, TOGGLE_S_OPEN, TOGGLE_P_OPEN} from './types'
const changePriceRange = (newPriceRange) => ({
        type: CHANGE_PRICE_RANGE,
        payload: newPriceRange
})
const sortBy = (key) => ({
        type: SORT_BY,
        payload: key
    }
)
const changeRating = (newRating) => ({
    type: CHANGE_RATING,
    payload: newRating
})
const clearFilters = () => ({type: CLEAR_FILTERS})

const toggleROpen = () => ({type: TOGGLE_R_OPEN})
const toggleSOpen = () => ({type: TOGGLE_S_OPEN})
const togglePOpen = () => ({type: TOGGLE_P_OPEN})
export {changeRating, clearFilters, sortBy, changePriceRange, toggleROpen, toggleSOpen, togglePOpen}