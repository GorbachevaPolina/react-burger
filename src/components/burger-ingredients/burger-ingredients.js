import React, {useState, useRef} from "react";
import PropTypes from 'prop-types'
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-ingredients.module.css'
import dataShape from "../../utils/types";

const BurgerIngredients = ({data}) => {
    const [current, setCurrent] = useState('bun');
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();

    const scrollToTab = (e) => {
        setCurrent(e);
        switch(e) {
            case 'bun':
                bunRef.current.scrollIntoView({behavior: "smooth"});
                break;
            case 'sauce':
                sauceRef.current.scrollIntoView({behavior: "smooth"});
                break;
            case 'main':
                mainRef.current.scrollIntoView({behavior: "smooth"});
                break;
        }

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
                <li id="bun" ref={bunRef}>
                    <p className="text text_type_main-medium mb-6">Булки</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            data.map((item) => {
                                if (item.type === 'bun') {
                                    return (
                                        <li className={styles.ingredient_card} key={item._id}>
                                            <Counter count={1} size="default" extraClass="m-1" />
                                            <img src={item.image} className="ml-4 mr-4 mb-1" alt={item.name}/>
                                            <p className="text text_type_digits-default mb-1">
                                                {item.price}
                                                <span className={`${styles.card_icon} ml-1`}><CurrencyIcon type="primary"/></span>
                                            </p>
                                            <p className="text text_type_main-small">{item.name}</p>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
                <li id="sauce" ref={sauceRef}>
                    <p className="text text_type_main-medium mb-6">Соусы</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            data.map((item) => {
                                if (item.type === 'sauce') {
                                    return (
                                        <li className={styles.ingredient_card} key={item._id}>
                                            <Counter count={1} size="default" extraClass="m-1" />
                                            <img src={item.image} className="ml-4 mr-4 mb-1" alt={item.name}/>
                                            <p className="text text_type_digits-default mb-1">
                                                {item.price}
                                                <span className={`${styles.card_icon} ml-1`}><CurrencyIcon type="primary"/></span>
                                            </p>                                        
                                            <p className="text text_type_main-small">{item.name}</p>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
                <li id="main" ref={mainRef}>
                    <p className="text text_type_main-medium mb-6">Начинка</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            data.map((item) => {
                                if (item.type === 'main') {
                                    return (
                                        <li className={styles.ingredient_card} key={item._id}>
                                            <Counter count={1} size="default" extraClass="m-1" />
                                            <img src={item.image} className="ml-4 mr-4 mb-1" alt={item.name}/>
                                            <p className="text text_type_digits-default mb-1">
                                                {item.price}
                                                <span className={`${styles.card_icon} ml-1`}><CurrencyIcon type="primary"/></span>
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

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataShape).isRequired 
}

export default BurgerIngredients;