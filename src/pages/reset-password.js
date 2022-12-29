import React, { useState } from 'react';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import styles from './form.module.css'
import { resetPassword } from '../services/actions/user';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { forgotPasswordSuccess } = useSelector((store) => store.user)
    const [passwordValue, setPasswordValue] = useState('');
    const [codeValue, setCodeValue] = useState('');

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(resetPassword(passwordValue, codeValue));
        history.replace({pathname: '/login'})
    }

    if(!forgotPasswordSuccess) {
        return <Redirect to='/forgot-password'/>
    }

    return (
        <form className={styles.container} onSubmit={handleClick}>
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
            <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? 
                <span><Link to='/login' className={styles.link}>Войти</Link></span>
            </p>
        </form>
    )
}

export default ResetPassword