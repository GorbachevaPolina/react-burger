import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from '../services/types/hooks'
import { TOrder } from '../services/types/order'
import styles from './order.module.css'


const Order = () => {
    const { id } = useParams<{id: string}>();
    const [data, setData] = useState<TOrder>();
    const order = useSelector((store) => store.ws.messages)?.orders.find((item: TOrder) => item.number === Number(id))
    const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients).filter((item) => data?.ingredients.includes(item._id))
    let total = 0;

    useEffect(() => {
        setData(order)
        if (!data) {
            const getOrder = async (id: string) => {
                try {
                    let response = await fetch(`https://norma.nomoreparties.space/api/orders/${id}`)
                    let result = await response.json()
                    setData(result.orders[0])
                    return result
                } catch(error) {
                    console.error((error as Error).message)
                }
            }
            getOrder(id)
        }
    }, [data, id, order])

    if (!data) {
        return null;
    }

    return (
        <div className={styles.order_container}>
            <p className="text text_type_digits-default mb-5">#{data.number}</p>
            <p className="text text_type_main-medium mb-3">{data.name}</p>
            {
                data.status === 'done' ?
                    <p className="text text_type_main-small mb-10">Выполнен</p> :
                    data.status === 'pending' ?
                    <p className="text text_type_main-small mb-10">В работе</p> :
                    data.status === 'created' ?
                    <p className="text text_type_main-small mb-10">Создан</p> :
                    null
            }
            <p className="text text_type_main-medium">Состав:</p>
            <ul className={`${styles.ingredients_list} custom-scroll`}>
                {
                    ingredients.map((item) => {
                        const count = data["ingredients"].reduce((prev, curr) => {
                            return curr === item._id ? prev + 1 : prev
                        }, 0)
                        total += count * item.price;
                        return (
                            <li className={`${styles.ingredient} mb-4`} key={item._id}>
                                <img src={item.image_mobile} className={styles.image} alt="ingredient"/>
                                <p className={`${styles.middle} text text_type_main-default`}>{item.name}</p>
                                <p className='mr-6'>
                                    <span className="text text_type_digits-default">{count} x {item.price}</span>
                                    <span className={styles.icon}><CurrencyIcon type="primary" /></span>
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
            <section className={styles.order_bottom}>
                <FormattedDate date={new Date(data.createdAt)} className="text text_type_main-default text_color_inactive"/>
                <p className="text text_type_digits-default">
                    {total}
                    <span className={styles.icon}><CurrencyIcon type="primary" /></span>
                </p>
            </section>
        </div>
    )
}

export default Order