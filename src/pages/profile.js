import React, { useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './profile.module.css'

const Profile = () => {
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    return (
        <div className={styles.container}>
            <div>
                <p className="text text_type_main-large mb-6">
                    Профиль
                </p>
                <p className="text text_type_main-large text_color_inactive mb-6">
                    История заказов
                </p>
                <p className="text text_type_main-large text_color_inactive">
                    Выход
                </p>

                <p className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div>
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setNameValue(e.target.value)}
                    icon={'EditIcon'}
                    value={nameValue}
                    extraClass='mb-6'
                />
                <Input 
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={e => setEmailValue(e.target.value)}
                    icon={'EditIcon'}
                    value={emailValue}
                    extraClass='mb-6'
                />
                <Input 
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setPasswordValue(e.target.value)}
                    icon={'EditIcon'}
                    value={passwordValue}
                    extraClass='mb-6'
                />
            </div>
        </div>
    )
}

export default Profile