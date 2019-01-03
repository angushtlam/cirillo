import {combineReducers} from 'redux'
import inventory from './inventory'
import settings from './settings'
import timer from './timer'

const reducers = combineReducers({
  inventory,
  settings,
  timer,
})

export default reducers
