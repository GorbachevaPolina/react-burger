import React from "react";
import PropTypes from 'prop-types'
import dataShape from "../../utils/types";
import styles from './ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

const Ingredient = ({item, handleOpenModal}) => {
    const counter = useSelector((store) => store.burgerIngredients.constructorIngredients).reduce((prev, curr) => {
        if (curr._id === item._id) {
            return prev + 1;
        } else {
            return prev
        }
    }, 0)
    
    const [, ref] = useDrag({
        type: `${item.type}`,
        item: { id: item._id, type: item.type }
    })
    return (
        <li className={styles.ingredient_card} key={item._id} onClick={() => handleOpenModal(item)} ref={ref}>
            <Counter count={counter} size="default" extraClass="m-1" />
            <img src={item.image} className="ml-4 mr-4 mb-1" alt={item.name}/>
            <p className="text text_type_digits-default mb-1">
                {item.price}
            <span className={`${styles.card_icon} ml-1`}><CurrencyIcon type="primary"/></span>
            </p>
            <p className="text text_type_main-small">{item.name}</p>
        </li>
    )
}

Ingredient.propTypes = {
    item: dataShape.isRequired,
    handleOpenModal: PropTypes.func.isRequired
}

export default Ingredient;