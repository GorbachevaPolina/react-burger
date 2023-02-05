import React, { useState, FC } from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { useDispatch } from '../services/types/hooks'
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { register } from '../services/actions/user'

import styles from './form.module.css'

import { TFull } from '../services/types/inputs'

const Register : FC = () => {
    const dispatch = useDispatch();
    const [registerInfo, setRegisterInfo] = useState<TFull>({
        email: "",
        password: "",
        name: ""
    })

    const handleRegister = (e : React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        dispatch(register(registerInfo))
    }

    return (
        <form className={styles.container} onSubmit={handleRegister}>
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
            <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
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