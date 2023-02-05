import React, {FC} from 'react'
import doneIcon from '../../images/done.png'
import { useSelector } from '../../services/types/hooks'

const OrderDetails : FC = () => {
    const {order, orderRequest} = useSelector((store) => store.order)

    if (orderRequest) {
        return (
            <>
                <p className="text text_type_main-medium mb-10">Пожалуйста, подождите.</p>
                <p className="text text_type_main-default">Обрабатываем Ваш заказ.</p>
            </>
        )
    }
    return (
        <>
            <p className="text text_type_digits-large">{order}</p>
            <p className="text text_type_main-default mt-8 mb-15">идентификатор заказа</p>
            <img src={doneIcon} alt='Заказ принят'/>
            <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mb-10">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails