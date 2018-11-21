import tableReducer from './tableReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    tabledata: tableReducer
});

export default rootReducer 