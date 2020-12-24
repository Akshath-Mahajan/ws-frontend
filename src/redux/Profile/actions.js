import { CHANGE_PANE, PI_EDIT_EMAIL, PI_EDIT_MOBILE} from './types'
const changePane = (id) => {
    return {
        type: CHANGE_PANE,
        payload : id
    }
}

export { changePane }