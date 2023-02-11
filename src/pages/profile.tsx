import React, { useState, useEffect, FC } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from '../services/types/hooks'

import styles from './profile.module.css'
import { getUser, updateUser } from '../services/actions/user'

import { TFull } from '../services/types/inputs'
import ProfileSide from '../components/profile-side/profile-side'

const Profile : FC = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)
    const [userInfo, setUserInfo] = useState<TFull>({
        name: '',
        email: '',
        password: ''
    })
    const [isChanged, setIsChanged] = useState<boolean>(false)

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
        setIsChanged(true)
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

    useEffect(() => {
        if (user) {
            setUserInfo(prevInfo => ({
                ...prevInfo,
                email: user.email,
                name: user.name
            }))
        }
    }, [user])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <ProfileSide isActive={{profile: true, orders: false}}/>
            <div className={styles.profile_info}>
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
            </div>
        </div>
    )
}

export default Profile