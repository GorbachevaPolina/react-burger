import React, { useState, useEffect } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'

import styles from './profile.module.css'
import { getUser, logout, updateToken, updateUser } from '../services/actions/user'
import { getCookie } from '../utils/auth'
import { GET_USER_FAILED } from '../services/actions/user'
import { Redirect, useHistory } from 'react-router-dom'

const Profile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((store) => store.user)
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    // const [nameValue, setNameValue] = useState('')
    // const [emailValue, setEmailValue] = useState('')
    // const [passwordValue, setPasswordValue] = useState('')

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleInfoUpdate = () => {
        dispatch(updateUser(userInfo))
    }

    useEffect(() => {
        if (user) {
            setUserInfo({
                ...userInfo,
                email: user.email,
                name: user.name
            })
        }

        if(!user) {
            history.replace({pathname: '/login'})
        }
    }, [user])

    useEffect(() => {
        dispatch(getUser())
    }, [])

    // if(!user) {
    //     return (
    //         <Redirect to='/login'/>
    //     )
    // }

    return (
        <div className={styles.container}>
            <div>
                <p className="text text_type_main-large mb-6">
                    Профиль
                </p>
                <p className="text text_type_main-large text_color_inactive mb-6">
                    История заказов
                </p>
                <p className="text text_type_main-large text_color_inactive" onClick={handleLogout}>
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
                    onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                    icon={'EditIcon'}
                    value={userInfo.name}
                    extraClass='mb-6'
                />
                <Input 
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={e => setUserInfo({...userInfo, email: e.target.value})}
                    icon={'EditIcon'}
                    value={userInfo.email}
                    extraClass='mb-6'
                />
                <Input 
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setUserInfo({...userInfo, password: e.target.value})}
                    icon={'EditIcon'}
                    value={userInfo.password}
                    extraClass='mb-6'
                />
                <Button htmlType="button" type="primary" size="medium" onClick={handleInfoUpdate}>Сохранить</Button>
            </div>
        </div>
    )
}

export default Profile