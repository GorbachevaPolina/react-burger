import React, {useState} from "react";
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-ingredients.module.css'

const BurgerIngredients = ({data}) => {
    const [current, setCurrent] = useState('bun');

    const scrollToTab = (e) => {
        setCurrent(e);
        document.getElementById(e).scrollIntoView();
    }
    
    return (
        <section className={`${styles.wrapper} mb-10`}>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <div className={`${styles.tab_section} mb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={scrollToTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={scrollToTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={scrollToTab}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${styles.ingredients} custom-scroll`}>
                <li id="bun">
                    <p className="text text_type_main-medium mb-6">Булки</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            data.map((item) => {
                                if (item.type === 'bun') {
                                    return (
                                        <li className={styles.ingredient_card} key={item._id}>
                                            <Counter count={1} size="default" extraClass="m-1" />
                                            <img src={item.image} className="ml-4 mr-4 mb-1"/>
                                            <p className="text text_type_digits-default mb-1">
                                                {item.price}
                                                <span className="ml-1" style={{verticalAlign: "middle"}}><CurrencyIcon type="primary"/></span>
                                            </p>
                                            <p className="text text_type_main-small">{item.name}</p>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
                <li id="sauce">
                    <p className="text text_type_main-medium mb-6">Соусы</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            data.map((item) => {
                                if (item.type === 'sauce') {
                                    return (
                                        <li className={styles.ingredient_card} key={item._id}>
                                            <Counter count={1} size="default" extraClass="m-1" />
                                            <img src={item.image} className="ml-4 mr-4 mb-1"/>
                                            <p className="text text_type_digits-default mb-1">
                                                {item.price}
                                                <span className="ml-1" style={{verticalAlign: "middle"}}><CurrencyIcon type="primary"/></span>
                                            </p>                                        
                                            <p className="text text_type_main-small">{item.name}</p>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
                <li id="main">
                    <p className="text text_type_main-medium mb-6">Начинка</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            data.map((item) => {
                                if (item.type === 'main') {
                                    return (
                                        <li className={styles.ingredient_card} key={item._id}>
                                            <Counter count={1} size="default" extraClass="m-1" />
                                            <img src={item.image} className="ml-4 mr-4 mb-1"/>
                                            <p className="text text_type_digits-default mb-1">
                                                {item.price}
                                                <span className="ml-1" style={{verticalAlign: "middle"}}><CurrencyIcon type="primary"/></span>
                                            </p>                                        
                                            <p className="text text_type_main-small">{item.name}</p>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
            </ul>
        </section>
    )
}

export default BurgerIngredients;