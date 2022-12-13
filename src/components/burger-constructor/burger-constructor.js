import React, {useState, useContext, useReducer, useEffect} from "react";
import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { OrderNumberContext } from "../../context/order-number-context";

import { useSelector, useDispatch } from 'react-redux'

import {URL} from '../../utils/url'

// const initialState = {
//     total: 0,
//     data: {
//         bun: {},
//         ingredients: []
//     }
// }

const BurgerConstructor = () => {
    const { bun, main } = useSelector((store) => store.burgerConstructor)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderNumber, setOrderNumber] = useState(0)
    const [error, setError] = useState(null);

    // const checkout = async () => {
    //     const data = [constructorState.data.bun._id].concat(constructorState.data.ingredients.map(item => item._id))
    //     fetch(`${URL}orders`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({'ingredients': data})
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json()
    //               } 
    //               return Promise.reject(`Ошибка ${response.status}`)
    //         })
    //         .then((result) => setOrderNumber(result['order']['number']))
    //         .catch((error) => setError(error))
    // }

    const handleOrder = () => {
        setIsModalOpen(true)
        //checkout()
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    
    return ( 
        <section className={`${styles.wrapper} mt-25 mb-10 pl-4`}>
                <span className="ml-8"><ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                /></span>
                <ul className={`${styles.varied_ingredients} custom-scroll`}>
                    {
                        main.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className="mr-2"><DragIcon type="primary" /></span>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                            )
                            
                        })
                    }
                </ul>
                <span className="ml-8">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                /></span>

                {/* <div className={`${styles.checkout} mt-10 mr-8`}>
                    <p className="text text_type_digits-medium mr-10">
                        {constructorState.total}
                        <span className="ml-1"><CurrencyIcon type="primary" /></span>
                    </p>
                    <Button htmlType="button" type="primary" size="large" onClick={handleOrder}>Оформить заказ</Button>
                </div>
                {isModalOpen && <Modal header={null} onClose={handleCloseModal}>
                    {
                        error ? 
                            <h1>Возникла ошибка, перезагрузите страницу и повторите заказ</h1> 
                            : <OrderNumberContext.Provider value={orderNumber}>
                                <OrderDetails />
                              </OrderNumberContext.Provider>
                    }
                    
                </Modal>} */}
        </section>
    )
}

export default BurgerConstructor;