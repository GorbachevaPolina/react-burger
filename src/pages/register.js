import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './form.module.css'

const Register = () => {
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium mb-6">Регистрация</p>
            <Input 
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                value={nameValue}
                name={'name'}
                extraClass='mb-6'
            />
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
                Уже зарегистрированы?
                <span><Link to='/login' className={styles.link}>Войти</Link></span>
            </p>
        </div>
    )
}

export default Register;