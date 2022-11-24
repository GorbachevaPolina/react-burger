import React, {useState} from "react";
import {Tab, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-ingredients.module.css'

const BurgerIngredients = ({data}) => {
    const [current, setCurrent] = React.useState('bun')
    
    return (
        <section className={styles.wrapper}>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <div className={`${styles.tab_section} mb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="filling" active={current === 'filling'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <article className={`${styles.ingredients} custom-scroll`}>
            <section>
                <p className="text text_type_main-medium mb-6">Булки</p>
                <div className={`${styles.ingredients_section} ml-4 mb-10`}>
                    {
                        data.map((item) => {
                            if (item.type === 'bun') {
                                return (
                                    <div className={styles.ingredient_card}>
                                        <img src={item.image} className="ml-4 mr-4 mb-1"/>
                                        <p className="text text_type_digits-default mb-1">
                                            {item.price}
                                            <span className="ml-1" style={{verticalAlign: "middle"}}><CurrencyIcon type="primary"/></span>
                                        </p>
                                        <p className="text text_type_main-small">{item.name}</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </section>
            <section>
                <p className="text text_type_main-medium mb-6">Соусы</p>
                <div className={`${styles.ingredients_section} ml-4 mb-10`}>
                    {
                        data.map((item) => {
                            if (item.type === 'sauce') {
                                return (
                                    <div className={styles.ingredient_card}>
                                        <img src={item.image} className="ml-4 mr-4 mb-1"/>
                                        <p className="text text_type_digits-default mb-1">
                                            {item.price}
                                            <span className="ml-1" style={{verticalAlign: "middle"}}><CurrencyIcon type="primary"/></span>
                                        </p>                                        
                                        <p className="text text_type_main-small">{item.name}</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </section>
            <section>
                <p className="text text_type_main-medium mb-6">Начинка</p>
                <div className={`${styles.ingredients_section} ml-4 mb-10`}>
                    {
                        data.map((item) => {
                            if (item.type === 'main') {
                                return (
                                    <div className={styles.ingredient_card}>
                                        <img src={item.image} className="ml-4 mr-4 mb-1"/>
                                        <p className="text text_type_digits-default mb-1">
                                            {item.price}
                                            <span className="ml-1" style={{verticalAlign: "middle"}}><CurrencyIcon type="primary"/></span>
                                        </p>                                        
                                        <p className="text text_type_main-small">{item.name}</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </section>
            </article>
        </section>
    )
}

export default BurgerIngredients;