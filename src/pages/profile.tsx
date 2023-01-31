import React, { useState, useEffect, FC } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from '../services/types/hooks'

import styles from './profile.module.css'
import { getUser, logout, updateUser } from '../services/actions/user'
import { useHistory, Switch, Route } from 'react-router-dom'
import NotFound404 from './not-found-404'

import { TFull } from '../services/types/inputs'

const Profile : FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((store) => store.user)
    const [userInfo, setUserInfo] = useState<TFull>({
        name: '',
        email: '',
        password: ''
    })
    const [isActive, setIsActive] = useState<{profile: boolean; orders: boolean}>({
        profile: true,
        orders: false
    })
    const [isChanged, setIsChanged] = useState<boolean>(false)

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
        setIsChanged(true)
    }

    const handleLogout = () : void => {
        dispatch(logout())
    }

    const handleInfoUpdate = (e : React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault()
        dispatch(updateUser(userInfo))
        setIsChanged(false)
    }

    const handleInfoRevert = () : void => {
        setUserInfo({
            email: user!.email,
            name: user!.name,
            password: ''
        })
        setIsChanged(false)
    }

    const handleRedirect = (path : string) : void => {
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