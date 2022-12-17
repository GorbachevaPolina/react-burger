import React, {useState, useEffect} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-ingredients.module.css'
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Ingredient from "./ingredient";

import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from "../../services/actions/burger-ingredients";
import { STOP_VIEW_CURRENT_INGREDIENT, VIEW_CURRENT_INGREDIENT } from "../../services/actions/current-ingredient";

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const {burgerIngredients, burgerIngredientsRequest, burgerIngredientsFailed} = useSelector((store) => store.burgerIngredients)
    
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [refBun, inViewBun, entryBun] = useInView({threshold: 1});
    const [refSauce, inViewSauce, entrySauce] = useInView({threshold: 0.5});
    const [refMain, inViewMain, entryMain] = useInView({threshold: 0.15});

    const scrollToTab = (e) => {
        switch(e) {
            case 'bun':
                entryBun.target.scrollIntoView({behavior: "smooth"});
                break;
            case 'sauce':
                entrySauce.target.scrollIntoView({behavior: "smooth"});
                break;
            case 'main':
                entryMain.target.scrollIntoView({behavior: "smooth"});
                break;
        }
    }

    const handleOpenModal = (item) => {
        dispatch({
            type: VIEW_CURRENT_INGREDIENT,
            item: item
        })
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        dispatch({
            type: STOP_VIEW_CURRENT_INGREDIENT
        })
        setIsModalOpen(false)
    }

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])
    
    if(burgerIngredientsRequest) {
        return (<h1>Загрузка</h1>) 
    } else if (burgerIngredientsFailed) {
        return (<h1>Возникла ошибка, перезагрузите страницу</h1>)
    } else{
    return (
        <section className={`${styles.wrapper} mb-10`}>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <div className={`${styles.tab_section} mb-10`}>
                <Tab value="bun" active={inViewBun} onClick={scrollToTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={!inViewBun && inViewSauce} onClick={scrollToTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={inViewMain} onClick={scrollToTab}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${styles.ingredients} custom-scroll`}>
                <li id="bun" ref={refBun}>
                    <p className="text text_type_main-medium mb-6">Булки</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            burgerIngredients.map((item) => {
                                if (item.type === 'bun') {
                                    return (
                                        <Ingredient item={item} handleOpenModal={handleOpenModal} key={item._id}/>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
                <li id="sauce" ref={refSauce}>
                    <p className="text text_type_main-medium mb-6">Соусы</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            burgerIngredients.map((item) => {
                                if (item.type === 'sauce') {
                                    return (
                                        <Ingredient item={item} handleOpenModal={handleOpenModal} key={item._id}/>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
                <li id="main" ref={refMain}>
                    <p className="text text_type_main-medium mb-6">Начинка</p>
                    <ul className={`${styles.ingredients_section} ml-4 mb-10`}>
                        {
                            burgerIngredients.map((item) => {
                                if (item.type === 'main') {
                                    return (
                                        <Ingredient item={item} handleOpenModal={handleOpenModal} key={item._id}/>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
            </ul>
            {isModalOpen && <Modal header={'Детали ингредиента'} onClose={handleCloseModal}>
                <IngredientDetails/>
            </Modal>}
        </section>
    )
    }
}



export default BurgerIngredients;