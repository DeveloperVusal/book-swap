import { 
    OAUTH_LOGIN,
    OAUTH_REGISTR,
    ALERT_OAUTH_LOGIN
} from './types'
import { Config } from '../Config'
import sha256 from 'crypto-js/sha256'
// import { useCookies } from 'react-cookie'

export const actionOAuthAlert = (obj) => {
    return {
        type: ALERT_OAUTH_LOGIN,
        payload: obj
    }
}

export const actionOAuthLogin = obj => {
    return async dispatch => {
        const response = await fetch(Config.server_uri + 'users.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (json === null) {
            dispatch({ 
                type: ALERT_OAUTH_LOGIN, 
                payload: {
                    alert: true,
                    type: 'danger',
                    alertMessage: 'Логин или пароль недействительны'
                }
            })
        } else {
            const users = Object.keys(json).map(key => ({...json[key]}))
            const isFind = users.find(item => item.login === obj.loginEmail || item.email === obj.loginEmail)

            console.log('obj.loginEmail', obj.loginEmail)

            if (isFind === undefined) {
                dispatch({ 
                    type: ALERT_OAUTH_LOGIN, 
                    payload: {
                        alert: true,
                        type: 'danger',
                        alertMessage: 'Логин или пароль недействительны'
                    }
                })
            } else {
                dispatch({
                    type: ALERT_OAUTH_LOGIN, 
                    payload: {
                        alert: true,
                        type: 'success',
                        alertMessage: 'Вы успешно авторизованы'
                    }
                })
                
                dispatch({
                    type: OAUTH_LOGIN,
                    payload: {
                        statusAuth: true,
                        tokentAuth: 'yes'
                    }
                })
            }
        }
    }
}

export const actionOAuthRegistr = (obj) => {
    return async dispatch => {
        const response = await fetch(Config.server_uri + 'users.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        
        if (json === null) {
            obj.password = sha256(obj.password).toString()

            const response2 = await fetch(Config.server_uri + 'users.json', {
                method: 'POST',
                body: JSON.stringify({...obj}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data2 = await response2.json()
            const userID = data2.name

            const response3 = await fetch(Config.server_uri + 'users.json', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data3 = await response3.json()
            const objKeys = Object.keys(data3)
            const userKey = objKeys.find(key => key === userID)
            const user = data3[userKey]
            console.log('Firebase new user', user)

            dispatch(actionOAuthAlert({
                alert: true,
                type: 'success',
                alertMessage: 'Вы успешно зарегистрировались'
            }))

            dispatch({
                type: OAUTH_REGISTR,
                payload: user
            })
        } else {
            const users = Object.keys(json).map(key => ({...json[key]}))

            console.log('Yes users', users)

            const isFind = users.find(item => item.login === obj.login || item.email === obj.email)

            console.log('isFind', isFind)

            if (isFind !== undefined) {
                dispatch({
                    type: ALERT_OAUTH_LOGIN, 
                    payload: {
                        alert: true,
                        type: 'danger',
                        alertMessage: 'Такой пользователь в системе уже существует'
                    }
                })
            } else {
                obj.password = sha256(obj.password).toString()

                const response2 = await fetch(Config.server_uri + 'users.json', {
                    method: 'POST',
                    body: JSON.stringify({...obj}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data2 = await response2.json()
                const userID = data2.name

                const response3 = await fetch(Config.server_uri + 'users.json', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data3 = await response3.json()
                const objKeys = Object.keys(data3)
                const userKey = objKeys.find(key => key === userID)
                const user = data3[userKey]
                console.log('Firebase new user', user)
                
                dispatch(actionOAuthAlert({
                    alert: true,
                    type: 'success',
                    alertMessage: 'Вы успешно зарегистрировались'
                }))

                dispatch({
                    type: OAUTH_REGISTR,
                    payload: user
                })
            }
        }
    }
}