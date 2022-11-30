import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
    return (
        <header>
            <nav>
                <ul className={`${styles.list} p-4`}>
                    <li className={`${styles.list_item} ${styles.nav_left}`}>
                        <a href="#" className="p-5">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default ml-2">Конструктор</p>
                        </a> 
                        <a href="#" className="ml-2 p-5">
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                        </a>
                    </li>
                    <li className={styles.list_item}>
                        <Logo />
                    </li>
                    <li className={styles.list_item}>
                        <a href="#" className="p-5">
                            <ProfileIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;