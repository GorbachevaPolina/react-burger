import React, { useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { register } from '../services/actions/user'

import styles from './form.module.css'

const Register = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const { user } = useSelector((store) => store.user)
    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        password: "",
        name: ""
    })

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(registerInfo))
    }

    if(user) {
        return (
            <Redirect to={ location.state?.from || '/' } />
        )
    }

    return (
        <form className={styles.container}>
            <p className="text text_type_main-medium mb-6">Регистрация</p>
            <Input 
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setRegisterInfo({...registerInfo, name: e.target.value})}
                value={registerInfo.name}
                name={'name'}
                extraClass='mb-6'
            />
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
            <Button htmlType="button" type="primary" size="medium" extraClass='mb-20' onClick={handleRegister}>
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Уже зарегистрированы?
                <span><Link to='/login' className={styles.link}>Войти</Link></span>
            </p>
        </form>
    )
}

export default Register;