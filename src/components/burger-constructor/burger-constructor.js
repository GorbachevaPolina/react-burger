import React, {useState, useContext, useReducer, useEffect} from "react";
import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { burgerIngredientsContext } from "../../services/burger-ingredients-context";
import { orderNumberContext } from "../../services/order-number-context";

import {URL} from '../../utils/url'

const initialState = {
    total: 0,
    data: {
        bun: {},
        ingredients: []
    }
}

const BurgerConstructor = () => {

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case "COUNT_TOTAL":
                return {
                    ...state,
                    total: 2 * state.data.bun.price + state.data.ingredients.reduce((prev, curr) => prev + curr.price, 0)
                }
            case "SEPARATE_INGREDIENTS":
                return {
                    total: 0,
                    data: {
                        bun: data.find((item) => {
                            if(item.type === 'bun') {
                                return true
                            }
                        }),
                        ingredients: data.filter(item => item.type !== 'bun')
                    }
                }  
        }
    }

    const data = useContext(burgerIngredientsContext);

    const [constructorState, dispatch] = useReducer(reducer, initialState)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderNumber, setOrderNumber] = useState(0)
    const [error, setError] = useState(null);

    const checkout = async () => {
        const data = [constructorState.data.bun._id].concat(constructorState.data.ingredients.map(item => item._id))
        fetch(`${URL}orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'ingredients': data})
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                  } 
                  return Promise.reject(`Ошибка ${response.status}`)
            })
            .then((result) => setOrderNumber(result['order']['number']))
            .catch((error) => setError(error))
    }

    const handleOrder = () => {
        setIsModalOpen(true)
        checkout()
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        dispatch({type: "SEPARATE_INGREDIENTS"});
        dispatch({type: "COUNT_TOTAL"})
    }, [data])
    
    return ( 
        <section className={`${styles.wrapper} mt-25 mb-10 pl-4`}>
                <span className="ml-8"><ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${constructorState.data.bun.name} (верх)`}
                    price={constructorState.data.bun.price}
                    thumbnail={constructorState.data.bun.image}
                /></span>
                <ul className={`${styles.varied_ingredients} custom-scroll`}>
                    {
                        constructorState.data.ingredients.map((item, index) => {
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
                    text={`${constructorState.data.bun.name} (низ)`}
                    price={constructorState.data.bun.price}
                    thumbnail={constructorState.data.bun.image}
                /></span>

                <div className={`${styles.checkout} mt-10 mr-8`}>
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
                            : <orderNumberContext.Provider value={orderNumber}>
                                <OrderDetails />
                              </orderNumberContext.Provider>
                    }
                    
                </Modal>}
        </section>
    )
}

export default BurgerConstructor;