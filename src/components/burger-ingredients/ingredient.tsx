import React, { FC } from "react";
import styles from './ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "../../services/types/hooks";
import { TIngredient } from "../../services/types/ingredients";

type TIngredientProps = {
    item: TIngredient;
};

const Ingredient : FC<TIngredientProps> = ({item}) => {
    const counter = useSelector((store) => store.burgerIngredients.counter![item._id])
    
    const [, ref] = useDrag({
        type: `${item.type}`,
        item: { item: item }
    })
    return (
        <li className={styles.ingredient_card} key={item._id} ref={ref} data-testid="ingredient_card">
            {counter ? <Counter count={counter} size="default" extraClass="m-1" /> : null}
            <img src={item.image} className="ml-4 mr-4 mb-1" alt={item.name}/>
            <p className="text text_type_digits-default mb-1">
                {item.price}
            <span className={`${styles.card_icon} ml-1`}><CurrencyIcon type="primary"/></span>
            </p>
            <p className="text text_type_main-small">{item.name}</p>
        </li>
    )
}

export default Ingredient;