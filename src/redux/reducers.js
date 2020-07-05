import { 
    OAUTH_LOGIN, 
    OAUTH_REGISTR,
    ALERT_OAUTH_LOGIN
 } from './types'

const initStateAuth = {
    statusAuth: false,
    tokentAuth: ''
}

export const oAuthLogin = (state = initStateAuth, action) => {
    switch (action.type) {
        case OAUTH_LOGIN: 
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const oAuthRegistr = (state = [], action) => {
    switch (action.type) {
        case OAUTH_REGISTR:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const initStateAlerts = {
    alert: false,
    type: 'danger',
    alertMessage: ''
}

export const oAuthAlerts = (state = initStateAlerts, action) => {
    switch (action.type) {
        case ALERT_OAUTH_LOGIN: 
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}