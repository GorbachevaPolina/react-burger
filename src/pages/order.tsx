import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from '../services/types/hooks'
import styles from './order.module.css'

const testData = {
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
  }

const Order = () => {
    const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients).filter((item) => testData.ingredients.includes(item._id))
    let total = 0;
    // useEffect(() => {
    //     const data = ingredients.filter((item) => testData.ingredients.includes(item._id))
    //     // data.forEach((item) => {return {...item, testData["ingredients"].reduce((prev, curr) => prev + curr), 0}})
    // }, [ingredients])

    return (
        <div className={styles.order_container}>
            <p className="text text_type_digits-default mb-5">#{testData.number}</p>
            <p className="text text_type_main-medium mb-3">{testData.name}</p>
            {
                testData.status === 'done' ?
                    <p className="text text_type_main-small mb-10">Выполнен</p> :
                    testData.status === 'pending' ?
                    <p className="text text_type_main-small mb-10">В работе</p> :
                    testData.status === 'created' ?
                    <p className="text text_type_main-small mb-10">Создан</p> :
                    null
            }
            <p className="text text_type_main-medium">Состав:</p>
            <ul className={`${styles.ingredients_list} custom-scroll`}>
                {
                    // testData.ingredients.map((item) => {
                    //     const ingredientInfo = ingredients.find((elem) => elem._id === item)
                    //     return ingredientInfo ? (
                    //         <li>
                    //             <img src={ingredientInfo.image_mobile}/>
                    //             <p>{ingredientInfo.name}</p>
                    //         </li>
                    //     ) : null
                    // })
                    ingredients.map((item) => {
                        const count = testData["ingredients"].reduce((prev, curr) => {
                            return curr === item._id ? prev + 1 : prev
                        }, 0)
                        total += count * item.price;
                        return (
                            <li className={`${styles.ingredient} mb-4`}>
                                <img src={item.image_mobile} className={styles.image}/>
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
                <FormattedDate date={new Date(testData.createdAt)} className="text text_type_main-default text_color_inactive"/>
                <p className="text text_type_digits-default">
                    {total}
                    <span className={styles.icon}><CurrencyIcon type="primary" /></span>
                </p>
            </section>
        </div>
    )
}

export default Order