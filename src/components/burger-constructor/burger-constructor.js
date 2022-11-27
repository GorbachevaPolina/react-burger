import React from "react";
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import dataShape from "../../utils/types";

const BurgerConstructor = ({data}) => {
    const total = data.reduce((prev, curr) => prev + curr.price, 0);

    return ( 
        <section className={`${styles.wrapper} mt-25 mb-10 pl-4`}>
                <span className="ml-8"><ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${data[0].name} (верх)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                /></span>
                <ul className={`${styles.varied_ingredients} custom-scroll`}>
                    {
                        data.slice(1).map((item, index) => {
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
                    text={`${data[0].name} (низ)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                /></span>

                <div className={`${styles.checkout} mt-10 mr-8`}>
                    <p className="text text_type_digits-medium mr-10">
                        {total}
                        <span className="ml-1"><CurrencyIcon type="primary" /></span>
                    </p>
                    <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
                </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataShape).isRequired
}

export default BurgerConstructor;