import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { login } from '../services/actions/user'

import styles from './form.module.css'

const Login = () => {
    const dispatch = useDispatch()
    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        password: ""
    })

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(registerInfo))
    }

    return (
        <form className={styles.container} onSubmit={handleLogin}>
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
            <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
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