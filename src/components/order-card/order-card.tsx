import React, { FC } from 'react'
import { TData } from '../../services/types/order';
import styles from './order-card.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/types/hooks';
import { TIngredient } from '../../services/types/ingredients';
import { Link, useLocation } from 'react-router-dom';

type TOrderCardProps = {
    data: TData;
    from: string
}

const OrderCard: FC<TOrderCardProps> = ({data, from}) => {
    const location = useLocation()
    const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients)
    return (
        <>
        {data["orders"].map((item) => {
            const total = (ingredients as TIngredient[]).reduce((prev: number, curr: TIngredient) => {
                if (item.ingredients.includes(curr._id)) 
                    return prev + curr.price
                else return prev
            }, 0)
            return (
                <Link to={{pathname: `${from}/${item.number}`, state: {background: location}}} className={styles.link}>
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
    }</>
    )
}

export default OrderCard;