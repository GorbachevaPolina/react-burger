import React, { useRef } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burger-constructor';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

const ConstructorIngredient = ({item, moveIngredient, index}) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'card',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    const [, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id: item.constructor_id, index }
        },
    })

    drag(drop(ref))

    const handleDeleteElement = () => {
        dispatch({
            type: REMOVE_CONSTRUCTOR_INGREDIENT,
            constructor_id: item.constructor_id
        })
    }
    return (
        <li ref={ref}>
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