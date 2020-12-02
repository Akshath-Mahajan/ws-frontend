import { CHANGE_PANE } from './types'
const changePane = (id) => {
    return {
        type: CHANGE_PANE,
        payload : id
    }
}
export { changePane }