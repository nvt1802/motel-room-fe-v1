import account from './account'
import province from './province'
import district from './district'
import authenticate from './authenticate'
import discover from './discover'
import { combineReducers } from 'redux'

const myReducers = combineReducers({ account, province, district, authenticate, discover })

export default myReducers