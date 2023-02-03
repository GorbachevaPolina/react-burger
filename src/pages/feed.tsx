import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, useEffect} from 'react';
import { useSelector } from '../services/types/hooks';
import { TIngredient } from '../services/types/ingredients';
import styles from './feed.module.css'
import { Link, useLocation } from 'react-router-dom';
import { TData, TOrder } from '../services/types/order';
import OrderCard from '../components/order-card/order-card';
import { useDispatch } from '../services/types/hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/socket';

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

const Feed: FC = () => {
    const location = useLocation()
    const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients)
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
    }

    if (!wsConnected || !messages) {
        return <h1>Загрузка</h1>
    }

    return  (
        <>
        <p className="text text_type_main-large pl-15 mb-2">Лента заказов</p>
        <div className={styles.container}>
            <div className={`${styles.left} custom-scroll`}>
                <ul>
                    <OrderCard data={messages} from={'feed'}/>
                    {/* {
                        testData["orders"].map((item) => {
                            const total = (ingredients as TIngredient[]).reduce((prev: number, curr: TIngredient) => {
                                if (item.ingredients.includes(curr._id)) 
                                    return prev + curr.price
                                else return prev
                            }, 0)
                            return (
                                <Link to={{pathname: `feed/${item.number}`, state: {background: location}}} className={styles.link}>
                                <li className={styles.order_container}>
                                    <p className={styles.order_head}>
                                        <span className="text text_type_main-default">#{item.number}</span>
                                        <span className="text text_type_main-default text_color_inactive">
                                            <FormattedDate date={new Date(item.createdAt)} />
                                        </span>
                                    </p>
                                    <p className="text text_type_main-medium">{item.name}</p>
                                    <p className={styles.ingredients_container}>
                                        <ul>
                                            {
                                                item.ingredients.map((ingredient, index) => {
                                                    const ingredientInfo = ingredients.find((elem) => elem._id === ingredient)
                                                    if (ingredientInfo) {
                                                        if (index < 5) {
                                                            return (
                                                                <li className={styles.ingredient_image} style={{zIndex: 1000-index}}>
                                                                     <img src={ingredientInfo.image_mobile} className={styles.image} alt='ingredient'/>
                                                                </li>
                                                            )
                                                        } else if (index === 5) {
                                                            return (
                                                            <li className={styles.ingredient_image}>
                                                                    <img src={ingredientInfo.image_mobile} className={styles.image} alt='ingredient'/>
                                                                    <div className={styles.image_overlay_div}>
                                                                    </div>
                                                                    <p className={styles.image_overlay_p}>+{item.ingredients.length-index}</p>
                                                            </li>)
                                                        }
                                                    }
                                                    return null
                                                })
                                            }
                                        </ul>
                                    <span className="text text_type_digits-medium">{total}<CurrencyIcon type="primary" /></span>
                                    </p>
                                </li>
                                </Link>
                            )
                        })
                    } */}
                </ul>
            </div>
            <div className={styles.right}>
                <section className={`${styles.order_status} mb-15`}>
                    <div>
                        <p className="text text_type_main-medium mb-6">Готовы:</p>
                        <div className={styles.status}>
                        {
                            messages["orders"].map((item: TOrder) => {
                                return item["status"] === 'done' ? <p className="text text_type_digits-default mb-2">{item.number}</p> : null
                            })
                        }
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mb-6">В работе:</p>
                        <div className={styles.status}>
                        {
                            messages["orders"].map((item: TOrder) => {
                                return item["status"] === 'pending' ? <p className="text text_type_digits-default mb-2">{item.number}</p> : null
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