import React, { useEffect, FC } from 'react'
import OrderCard from '../components/order-card/order-card'
import ProfileSide from '../components/profile-side/profile-side'
import styles from './profile.module.css'
import { useDispatch, useSelector } from '../services/types/hooks'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/socket'
import { getCookie } from '../utils/auth'

const ProfileOrders: FC = () => { 
  const dispatch = useDispatch()
  const {wsConnected, messages, error} = useSelector((store) => store.ws)
    const isActive = {
        profile: false,
        orders: true
    }

    useEffect(() => {
      const accessToken = getCookie('token')
      dispatch({type: WS_CONNECTION_START, payload: `?token=${accessToken}`})

      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED })
    }
    }, [])

    if (!wsConnected || !messages) {
      return <h1>Загрузка</h1>
    } else if (error) {
      return (
        <h1>Ошибка. Перезагрузите страницу</h1>
      )
    }

    return (
        <div className={styles.container}>
            <ProfileSide isActive={isActive}/>
            <div className={`${styles.orders_container} custom-scroll`}>
                <ul>
                <OrderCard data={messages} from={"orders"}/>
                </ul>
            </div>
        </div>
    )
}

export default ProfileOrders