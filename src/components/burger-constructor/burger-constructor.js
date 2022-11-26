import React from "react";
import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = ({data}) => {
    const total = data[0].price * 2 + data[5].price + 2* data[4].price + data[7].price + 2 * data[8].price + data[9].price;

    return (
        <section className={`${styles.wrapper} mt-25 mb-10`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="ml-4">
                <span className="ml-8"><ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${data[0].name} (верх)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                /></span>
                <ul className={`${styles.varied_ingredients} custom-scroll`} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li>
                        <span className="mr-2"><DragIcon type="primary" /></span>
                        <ConstructorElement
                            text={data[5].name}
                            price={data[5].price}
                            thumbnail={data[5].image}
                        />
                    </li>
                    <li>
                        <span className="mr-2"><DragIcon type="primary" /></span>
                        <ConstructorElement
                            text={data[4].name}
                            price={data[4].price}
                            thumbnail={data[4].image}
                        />
                    </li>
                    <li>
                        <span className="mr-2"><DragIcon type="primary" /></span>
                        <ConstructorElement
                            text={data[7].name}
                            price={data[7].price}
                            thumbnail={data[7].image}
                        />
                    </li>
                    <li>
                        <span className="mr-2"><DragIcon type="primary" /></span>
                        <ConstructorElement
                            text={data[8].name}
                            price={data[8].price}
                            thumbnail={data[8].image}
                        />
                    </li>
                    <li>
                        <span className="mr-2"><DragIcon type="primary" /></span>
                        <ConstructorElement
                            text={data[8].name}
                            price={data[8].price}
                            thumbnail={data[8].image}
                        />
                    </li>
                    <li>
                        <span className="mr-2"><DragIcon type="primary" /></span>
                        <ConstructorElement
                            text={data[4].name}
                            price={data[4].price}
                            thumbnail={data[4].image}
                        />
                    </li>
                    <li>
                        <span className="mr-2"><DragIcon type="primary" /></span>
                        <ConstructorElement
                            text={data[9].name}
                            price={data[9].price}
                            thumbnail={data[9].image}
                        />
                    </li>
                    
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
            </div>
        </section>
    )
}

export default BurgerConstructor;