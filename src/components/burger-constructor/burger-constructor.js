import React, {useState} from "react";
import styles from './burger-constructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import { ADD_BUN, ADD_CONSTRUCTOR_INGREDIENT, MOVE_INGREDIENT, REMOVE_BUN } from "../../services/actions/burger-constructor";
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

import ConstructorIngredient from "./constructor-ingredient";
import { getOrder } from "../../services/actions/order";

const BurgerConstructor = () => {
    const { constructorIngredients, bun, main } = useSelector((store) => store.burgerIngredients)
    const { orderFailed } = useSelector((store) => store.order)
    const dispatch = useDispatch()

    const total = constructorIngredients.reduce((prev, curr) => {
        if (curr.type === 'bun') {
            return prev + 2 * curr.price
        } else {
            return prev + curr.price
        }
    }, 0)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const addIngredient = (item) => {
        if (item.type === 'bun') {
            dispatch({
                type: REMOVE_BUN
            })
            dispatch({
                type: ADD_BUN,
                id: item.id
            })
        } else {
            dispatch({
                type: ADD_CONSTRUCTOR_INGREDIENT,
                id: item.id,
                constructor_id: uuidv4()
            })
        }
    }

    const [, ref] = useDrop({
        accept: ['bun', 'sauce', 'main'],
        drop(item) {
            addIngredient(item)
        }
    })

    const handleOrder = () => {
        setIsModalOpen(true)
        const data = constructorIngredients.map((item) => item._id)
        dispatch(getOrder(data))
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const moveIngredient = (dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
    }
    
    return ( 
        <section className={`${styles.wrapper} mt-25 mb-10 pl-4`} ref={ref}>
                {bun ? <span className="ml-8"><ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                /></span> : null}

                <ul className={`${styles.varied_ingredients} custom-scroll`}>
                    {
                        main.map((item, index) => {
                            return (
                                <ConstructorIngredient item={item} moveIngredient={moveIngredient} index={index} key={item.constructor_id}/>
                            )
                            
                        })
                    }
                </ul>
                
                {bun ? <span className="ml-8">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                /></span> : null}

                <div className={`${styles.checkout} mt-10 mr-8`}>
                    <p className="text text_type_digits-medium mr-10">
                        {total}
                        <span className="ml-1"><CurrencyIcon type="primary" /></span>
                    </p>
                    {total ? <Button htmlType="button" type="primary" size="large" onClick={handleOrder}>Оформить заказ</Button> : null}
                </div>
                {isModalOpen && <Modal header={null} onClose={handleCloseModal}>
                    {
                        orderFailed ? 
                            <h1>Возникла ошибка, перезагрузите страницу и повторите заказ</h1> 
                            : <OrderDetails />
                    }
                    
                </Modal>}
        </section>
    )
}

export default BurgerConstructor;