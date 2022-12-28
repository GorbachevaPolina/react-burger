import React, {useEffect} from 'react'
import styles from './ingredient-details.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCurrentIngredient } from '../../services/actions/current-ingredient'

const IngredientDetails = () => {
    const dispatch = useDispatch()
    let data = useSelector((store) => store.currentIngredient.currentIngredient)
    const { id } = useParams()
    
    useEffect(() => {
        dispatch(getCurrentIngredient(id))
    }, [])
    
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