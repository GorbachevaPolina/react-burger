import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burger-constructor';
import { useDispatch } from 'react-redux';

const ConstructorIngredient = ({item, idx}) => {
    const dispatch = useDispatch();

    const handleDeleteElement = () => {
        dispatch({
            type: REMOVE_CONSTRUCTOR_INGREDIENT,
            constructor_id: item.constructor_id
        })
    }
    return (
        <li key={idx}>
            <span className="mr-2"><DragIcon type="primary" /></span>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={handleDeleteElement}
                 />
        </li>
    )
}

export default ConstructorIngredient;