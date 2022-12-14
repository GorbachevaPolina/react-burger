import React, {useState, useEffect, FC} from "react";
import styles from './burger-constructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

import OrderDetails from "../order-details/order-details";
import ConstructorIngredient from "./constructor-ingredient";
import Modal from "../modal/modal";

import { ADD_BUN, ADD_CONSTRUCTOR_INGREDIENT, MOVE_INGREDIENT, REMOVE_BUN } from "../../services/actions/burger-constructor";
import { getOrder } from "../../services/actions/order";
import { DECREASE_COUNTER, INCREASE_COUNTER } from "../../services/actions/burger-ingredients";
import { getUser } from "../../services/actions/user";

import { TIngredient, TConstructorIngredient } from "../../services/types/ingredients";

const BurgerConstructor : FC = () => {
    //@ts-ignore
    const { bun, main } = useSelector((store) => store.burgerConstructor)
    //@ts-ignore
    const { orderFailed } = useSelector((store) => store.order)
    //@ts-ignore
    const { user } = useSelector((store) => store.user)
    const dispatch = useDispatch()

    const total : number = bun ? 2 * bun.price + main.reduce((prev : number, curr : TIngredient) => prev + curr.price, 0) : main.reduce((prev : number, curr : TIngredient) => prev + curr.price, 0)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const addIngredient = (item : TIngredient) : void => {
        if (item.type === 'bun') {
            if (bun) {
                dispatch({
                    type: REMOVE_BUN
                })
                dispatch({
                    type: DECREASE_COUNTER,
                    id: bun._id
                })
            }
            dispatch({
                type: ADD_BUN,
                item: item
            })
        } else {
            dispatch({
                type: ADD_CONSTRUCTOR_INGREDIENT,
                item: item,
                constructor_id: uuidv4()
            })
        }
        dispatch({
            type: INCREASE_COUNTER,
            id: item._id
        })
    }

    const [, ref] = useDrop({
        accept: ['bun', 'sauce', 'main'],
        drop(item : {item : TIngredient}) {
            addIngredient(item.item)
        }
    })

    const handleOrder = () : void => {
        setIsModalOpen(true)
        const data = [bun._id, ...main.map((item : TIngredient) => item._id), bun._id]
        //@ts-ignore
        dispatch(getOrder(data))
    }

    const handleCloseModal = () : void => {
        setIsModalOpen(false)
    }

    const moveIngredient = (dragIndex : number, hoverIndex : number) : void => {
        dispatch({
            type: MOVE_INGREDIENT,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
    }

    useEffect(() => {
        //@ts-ignore
        dispatch(getUser())
    }, [])
    
    return ( 
        <section className={`${styles.wrapper} mt-25 mb-10 pl-4`} ref={ref}>
                {bun ? <span className="ml-8"><ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (????????)`}
                    price={bun.price}
                    thumbnail={bun.image}
                /></span> : null}

                <ul className={`${styles.varied_ingredients} custom-scroll`}>
                    {
                        main.map((item : TConstructorIngredient, index : number) => {
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
                    text={`${bun.name} (??????)`}
                    price={bun.price}
                    thumbnail={bun.image}
                /></span> : null}

                <div className={`${styles.checkout} mt-10 mr-8`}>
                    <p className="text text_type_digits-medium mr-10">
                        {total}
                        <span className="ml-1"><CurrencyIcon type="primary" /></span>
                    </p>
                    {total ? user ? <Button htmlType="button" type="primary" size="large" onClick={handleOrder}>???????????????? ??????????</Button> : <p className="text text_type_main-small">??????????????????????????????, ?????????? ?????????????? ??????????</p> : null}
                </div>
                {isModalOpen && <Modal header={null} onClose={handleCloseModal}>
                    {
                        orderFailed ? 
                            <h1>???????????????? ????????????, ?????????????????????????? ???????????????? ?? ?????????????????? ??????????</h1> 
                            : <OrderDetails />
                    }
                    
                </Modal>}
        </section>
    )
}

export default BurgerConstructor;