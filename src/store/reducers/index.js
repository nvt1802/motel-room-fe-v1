import account from './account'
import province from './province'
import district from './district'
import authenticate from './authenticate'
import { combineReducers } from 'redux'

const myReducers = combineReducers({ account, province, district, authenticate })

export default myReducers