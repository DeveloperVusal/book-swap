import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form, Alert } from 'react-bootstrap'

import { 
    actionOAuthLogin, 
    actionOAuthRegistr,
    actionOAuthAlert
} from '../redux/actions'

export const ModalOAuth = ({ isModalAuth, btnIsModalClose }) => {
    const [isModalReg, setIsModalReg] = useState(false)
    const [valueLogin, setValueLogin] = useState('')
    const [valueEmail, setValueEmail] = useState('')
    const [valuePassword, setValuePassword] = useState('')

    const isAlert = useSelector(state => state.oauth_func_alerts.alert)
    const isAlertType = useSelector(state => state.oauth_func_alerts.type)
    const isAlertMessage = useSelector(state => state.oauth_func_alerts.alertMessage)

    const dispatch = useDispatch()

    const btnOAuthServer = () => {
        if (valueLogin !== '' && valuePassword !== '') {
            dispatch(actionOAuthLogin({
                loginEmail: valueLogin,
                password: valuePassword
            }))

            dispatch(actionOAuthAlert({
                alert: false,
                type: 'danger',
                alertMessage: ''
            }))
        } else {
            dispatch(actionOAuthAlert({
                alert: true,
                type: 'danger',
                alertMessage: 'Введите логин и пароль'
            }))
        }
    }

    const btnRegistrServer = () => {
        if (valueLogin !== '' && valueEmail !== '' && valuePassword !== '') {
            dispatch(actionOAuthRegistr({
                login: valueLogin,
                email: valueEmail,
                password: valuePassword
            }))
        } else {
            dispatch(actionOAuthAlert({
                alert: true,
                type: 'warning',
                alertMessage: 'Все поля обязательны к заполнению'
            }))
        }
    }

    return (
        <>
            <Modal
                show={isModalAuth}
                onHide={() => btnIsModalClose(false)}
                backdrop="static"
                keyboard={false}
                centered={true}
            >
                <Modal.Header closeButton>
                <Modal.Title>Авторизация на сайте</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email или Логин</Form.Label>
                            <Form.Control
                                type="text"
                                onKeyUp={(event) => {
                                    setValueLogin(event.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                onKeyUp={(event) => {
                                    setValuePassword(event.target.value)
                                }}
                            />
                        </Form.Group>
                        <Alert show={isAlert} key="1" variant={isAlertType}>
                            {isAlertMessage}
                        </Alert>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer justify-content-center">
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setIsModalReg(true)
                            btnIsModalClose(false)

                            dispatch(actionOAuthAlert({
                                alert: false,
                                type: 'danger',
                                alertMessage: ''
                            }))
                        }}
                    >
                        Регистрация
                    </Button>
                    <Button variant="success" onClick={() => btnOAuthServer()}>Войти</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={isModalReg}
                onHide={() => setIsModalReg(false)}
                backdrop="static"
                keyboard={false}
                centered={true}
            >
                <Modal.Header closeButton>
                <Modal.Title>Регистрация на сайте</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                type="text"
                                onKeyUp={(event) => {
                                    setValueLogin(event.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                onKeyUp={(event) => {
                                    setValueEmail(event.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                onKeyUp={(event) => {
                                    setValuePassword(event.target.value)
                                }}
                            />
                        </Form.Group>
                        <Alert show={isAlert} key="1" variant={isAlertType}>
                            {isAlertMessage}
                        </Alert>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer justify-content-center">
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setIsModalReg(false)
                            btnIsModalClose(true)
                            dispatch(actionOAuthAlert({
                                alert: false,
                                type: 'danger',
                                alertMessage: ''
                            }))
                        }}
                    >
                        Авторизация
                    </Button>
                    <Button variant="success" onClick={() => btnRegistrServer()}>Зарегистрироваться</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}