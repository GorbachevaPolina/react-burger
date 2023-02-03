import React, { useEffect } from 'react'
import OrderCard from '../components/order-card/order-card'
import ProfileSide from '../components/profile-side/profile-side'
import styles from './profile.module.css'
import { TData } from '../services/types/order'
import { useDispatch, useSelector } from '../services/types/hooks'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/socket'
import { getCookie } from '../utils/auth'

const testData: TData = {
    "success": true,
    "orders": [
        {
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c9",
            "60d3b41abdacab0026a733ca",
            "60d3b41abdacab0026a733cc"
          ],
          "_id": "",
          "status": "done",
          "number": 113,
          "createdAt": "2023-02-01T03:43:22.587Z",
          "updatedAt": "2023-02-01T03:43:22.603Z",
          "name": "Death Star Starship бургер"
        },
        {
            "ingredients": [
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733c9",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733cf",
              "60d3b41abdacab0026a733ca",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733cc"
            ],
            "_id": "",
            "status": "pending",
            "number": 224,
            "createdAt": "2023-02-01T01:45:22.587Z",
            "updatedAt": "2023-02-01T01:45:22.603Z",
            "name": "Interstellar бургер"
          },
          {
            "ingredients": [
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733c9",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733cf",
              "60d3b41abdacab0026a733ca",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733cc"
            ],
            "_id": "",
            "status": "done",
            "number": 124,
            "createdAt": "2023-02-01T01:45:22.587Z",
            "updatedAt": "2023-02-01T01:45:22.603Z",
            "name": "Interstellar бургер"
          },
          {
            "ingredients": [
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733c9",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733cf",
              "60d3b41abdacab0026a733ca",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733cc"
            ],
            "_id": "",
            "status": "pending",
            "number": 244,
            "createdAt": "2023-02-01T01:45:22.587Z",
            "updatedAt": "2023-02-01T01:45:22.603Z",
            "name": "Interstellar бургер"
          },
      ],
      "total": 2,
      "totalToday": 2
}

const ProfileOrders = () => { 
  const dispatch = useDispatch()
  const {wsConnected, messages} = useSelector((store) => store.ws)
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