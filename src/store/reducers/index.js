import account from './account'
import location from './location'
import authenticate from './authenticate'
import discover from './discover'
import search from './search'
import criteria from './criteria'
import layout from './layout'
import { combineReducers } from 'redux'

const myReducers = combineReducers({ account, location, authenticate, discover, search, criteria, layout })

export default myReducers