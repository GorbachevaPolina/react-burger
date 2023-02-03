import React, {useEffect, FC} from 'react'
import styles from './ingredient-details.module.css'
import { useSelector, useDispatch } from '../../services/types/hooks'
import { useParams } from 'react-router-dom'
import { VIEW_CURRENT_INGREDIENT } from '../../services/action-types/current-ingredient-actions'

const IngredientDetails : FC = () => {
    const dispatch = useDispatch() 
    const { id } = useParams<{id?: string}>()
    const data = useSelector((store) => store.burgerIngredients.burgerIngredients).find((item) => item._id === id)
    
    useEffect(() => {
        if (data)
            dispatch({
                type: VIEW_CURRENT_INGREDIENT,
                item: data
            })
    }, [data])
    
    if (!data) {
        return null
    }

    return (
        <div className={styles.container}>
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
        </div>
    )
}


export default IngredientDetails