import React from 'react'
import Modal from '../modal/modal'
import PropTypes from 'prop-types'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const OrderDetails = ({onClose}) => {
    return (
        <Modal header={null} onClose={onClose}>
            <p className="text text_type_digits-large">034536</p>
            <p className="text text_type_main-default mt-8 mb-15">идентификатор заказа</p>
            <CheckMarkIcon type="primary"/>
            <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mb-10">Дождитесь готовности на орбитальной станции</p>
        </Modal>
    )
}

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default OrderDetails