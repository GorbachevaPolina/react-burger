import React, { useState } from 'react';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom'

import styles from './form.module.css'

const ResetPassword = () => {
    const [passwordValue, setPasswordValue] = useState('');
    const [codeValue, setCodeValue] = useState('');

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <PasswordInput 
                onChange={e => setPasswordValue(e.target.value)}
                value={passwordValue}
                name={'password'}
                placeholder="Введите новый пароль"
                extraClass='mb-6'
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setCodeValue(e.target.value)}
                value={codeValue}
                name={'code'}
                extraClass='mb-6'
            />
            <Button htmlType="button" type="primary" size="medium" extraClass='mb-20'>
                Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? 
                <span><Link to='/login' className={styles.link}>Войти</Link></span>
            </p>
        </div>
    )
}

export default ResetPassword