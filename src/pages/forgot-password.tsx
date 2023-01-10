import React, { useState, FC } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import styles from './form.module.css'
import { forgotPassword } from '../services/actions/user';

const ForgotPassword : FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [emailValue, setEmailValue] = useState<string>('');

    const handleClick = (e : React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault()
        //@ts-ignore
        dispatch(forgotPassword(emailValue));
        history.replace({ pathname: '/reset-password' })
    }

    return (
        <form className={styles.container} onSubmit={handleClick}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <EmailInput 
                onChange={e => setEmailValue(e.target.value)}
                value={emailValue}
                name={'email'}
                placeholder="Укажите email"
                isIcon={false}
                extraClass='mb-6'
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                Восстановить
            </Button>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? 
                <span><Link to='/login' className={styles.link}>Войти</Link></span>
            </p>
        </form>
    )
}

export default ForgotPassword