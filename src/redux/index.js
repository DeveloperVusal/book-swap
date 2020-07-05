import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { 
    oAuthLogin, 
    oAuthRegistr,
    oAuthAlerts
} from './reducers'

const routeReducer = combineReducers({
    oauth_func_login: oAuthLogin,
    oauth_func_alerts: oAuthAlerts,
    oauth_func_registr: oAuthRegistr
})

export default createStore(routeReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))