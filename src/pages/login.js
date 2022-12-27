import React, { useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/actions/user'

import styles from './form.module.css'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)
    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        password: ""
    })

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(registerInfo))
    }

    if(user) {
        return (
            <Redirect to={ location.state?.from || '/' } />
        )
    }

    return (
        <form className={styles.container}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <EmailInput 
                onChange={e => setRegisterInfo({...registerInfo, email: e.target.value})}
                value={registerInfo.email}
                name={'email'}
                isIcon={false}
                extraClass='mb-6'
            /> 
            <PasswordInput
                onChange={e => setRegisterInfo({...registerInfo, password: e.target.value})}
                value={registerInfo.password}
                name={'password'}
                extraClass='mb-6'
            />
            <Button htmlType="button" type="primary" size="medium" extraClass='mb-20' onClick={handleLogin}>
                Войти
            </Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Вы - новый пользователь?
                <span><Link to='/register' className={styles.link}>Зарегистрироваться</Link></span>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? 
                <span><Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link></span>
            </p>
        </form>
    )
}

export default Login;