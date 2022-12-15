import React, {useContext} from 'react'
import doneIcon from '../../images/done.png'
import { useSelector } from 'react-redux'

const OrderDetails = () => {
    const orderNumber = useSelector((store) => store.order.order)
    return (
        <>
            <p className="text text_type_digits-large">{orderNumber}</p>
            <p className="text text_type_main-default mt-8 mb-15">идентификатор заказа</p>
            <img src={doneIcon} alt='Заказ принят'/>
            <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mb-10">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails