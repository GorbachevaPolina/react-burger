import React, {FC, useEffect} from 'react';
import { useSelector } from '../services/types/hooks';
import styles from './feed.module.css'
import { TOrder } from '../services/types/order';
import OrderCard from '../components/order-card/order-card';
import { useDispatch } from '../services/types/hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/socket';

const Feed: FC = () => {
    const {wsConnected, messages, error} = useSelector((store) => store.ws)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: '/all' })

        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED })
        }
    }, [])

    if(error) {
        return <h1>Ошибка. Перезагрузите страницу</h1>
    } else if (!wsConnected || !messages) {
        return <h1>Загрузка</h1>
    }
    return  (
        <>
        <p className="text text_type_main-large pl-15 mb-2">Лента заказов</p>
        <div className={styles.container}>
            <div className={`${styles.left} custom-scroll`}>
                <ul>
                    <OrderCard data={messages} from={'feed'}/>
                </ul>
            </div>
            <div className={styles.right}>
                <section className={`${styles.order_status} mb-15`}>
                    <div>
                        <p className="text text_type_main-medium mb-6">Готовы:</p>
                        <div className={styles.status}>
                        {
                            messages["orders"].map((item: TOrder) => {
                                return item["status"] === 'done' ? <p className="text text_type_digits-default mb-2" key={item.number}>{item.number}</p> : null
                            })
                        }
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mb-6">В работе:</p>
                        <div className={styles.status}>
                        {
                            messages["orders"].map((item: TOrder) => {
                                return item["status"] === 'pending' ? <p className="text text_type_digits-default mb-2" key={item.number}>{item.number}</p> : null
                            })
                        }
                        </div>
                    </div>
                </section>
                <section className='mb-15'>
                    <p className="text text_type_main-medium">Выполнено за все время:</p>
                    <p className="text text_type_digits-large">{messages["total"]}</p>
                </section>
                <section>
                    <p className="text text_type_main-medium">Выполнено за сегодня</p>
                    <p className="text text_type_digits-large">{messages["totalToday"]}</p>
                </section>
            </div>
        </div>
        </>
    )
}

export default Feed;