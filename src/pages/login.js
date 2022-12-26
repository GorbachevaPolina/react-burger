import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './form.module.css'

const Login = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <EmailInput 
                onChange={e => setEmailValue(e.target.value)}
                value={emailValue}
                name={'email'}
                isIcon={false}
                extraClass='mb-6'
            />
            <PasswordInput
                onChange={e => setPasswordValue(e.target.value)}
                value={passwordValue}
                name={'password'}
                extraClass='mb-6'
            />
            <Button htmlType="button" type="primary" size="medium" extraClass='mb-20'>
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
        </div>
    )
}

export default Login;