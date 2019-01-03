import {combineReducers} from 'redux'
import inventory from './inventory'
import settings from './settings'

const reducers = combineReducers({
  inventory,
  settings,
})

export default reducers
