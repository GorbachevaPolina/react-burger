import React from 'react'
import Modal from '../modal/modal'
import styles from './ingredient-details.module.css'

const IngredientDetails = ({onClose, data}) => {
    return (
        <Modal header="Детали ингредента" onClose={onClose}>
                <img src={data.image_large} alt={data.name} />
                <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>
                <div className={`${styles.modal_info} mb-15`}>
                    <div>
                        <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
                    </div>
                </div>
        </Modal>
    )
}

export default IngredientDetails