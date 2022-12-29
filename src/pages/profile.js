import React, { useState, useEffect } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'

import styles from './profile.module.css'
import { getUser, logout, updateUser } from '../services/actions/user'
import { useHistory, Switch, Route } from 'react-router-dom'
import NotFound404 from './not-found-404'

const Profile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((store) => store.user)
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [isActive, setIsActive] = useState({
        profile: true,
        orders: false
    })
    const [isChanged, setIsChanged] = useState(false)

    const onChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
        setIsChanged(true)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleInfoUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUser(userInfo))
        setIsChanged(false)
    }

    const handleInfoRevert = () => {
        setUserInfo({
            email: user.email,
            name: user.name,
            password: ''
        })
        setIsChanged(false)
    }

    const handleRedirect = (path) => {
        setIsActive({
            profile: path === '/profile',
            orders: path === '/profile/orders'
        })
        history.replace({pathname: path})
    }

    useEffect(() => {
        if (user) {
            setUserInfo({
                ...userInfo,
                email: user.email,
                name: user.name
            })
        }
    }, [user])

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <div className={styles.container}>
            <div>
                <p className={`text text_type_main-large mb-6 ${isActive.profile ? "" : "text_color_inactive"} ${styles.text}`} onClick={() => handleRedirect('/profile')}>
                    Профиль
                </p>
                <p className={`text text_type_main-large mb-6 ${isActive.orders ? "" : "text_color_inactive"} ${styles.text}`} onClick={() => handleRedirect('/profile/orders')}>
                    История заказов
                </p>
                <p className={`text text_type_main-large text_color_inactive ${styles.text}`} onClick={handleLogout}>
                    Выход
                </p>

                <p className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div>
                <form onSubmit={handleInfoUpdate}>
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => onChange(e)}
                    icon={'EditIcon'}
                    value={userInfo.name}
                    extraClass='mb-6'
                    name={'name'}
                />
                <Input 
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={e => onChange(e)}
                    icon={'EditIcon'}
                    value={userInfo.email}
                    extraClass='mb-6'
                    name={'email'}
                />
                <Input 
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => onChange(e)}
                    icon={'EditIcon'}
                    value={userInfo.password}
                    extraClass='mb-6'
                    name={'password'}
                />
                {isChanged ? (
                    <>
                        <Button htmlType="button" type="primary" size="medium" onClick={handleInfoRevert} extraClass={styles.button}>Отмена</Button>
                        <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                    </>
                ) : null}
                </form>

                <Switch>
                    <Route path="/profile/orders">
                        <NotFound404 />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Profile