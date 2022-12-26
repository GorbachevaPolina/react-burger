import React, { useState, useEffect } from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { useLocation, Link } from 'react-router-dom'

const initialHeaderState = {
    home: {
        icon: "primary",
        text: ""
    },
    orders: {
        icon: "secondary",
        text: "text_color_inactive"
    },
    profile: {
        icon: "secondary",
        text: "text_color_inactive"
    }
}

const AppHeader = () => {
    const location = useLocation();

    const [header, setHeader] = useState(initialHeaderState)

    useEffect(() => {
        switch(location.pathname) {
            case "/": 
                setHeader(initialHeaderState)
                break;
            case "/orders":
                setHeader({
                    ...initialHeaderState,
                    orders: {
                        icon: "primary",
                        text: ""
                    },
                    home: {
                        icon: "secondary",
                        text: "text_color_inactive"
                    }
                });
                break;
            case "/profile":
                setHeader({
                    ...initialHeaderState,
                    profile: {
                        icon: "primary",
                        text: ""
                    },
                    home: {
                        icon: "secondary",
                        text: "text_color_inactive"
                    }
                });
                break;
        }
    }, [location])

    return (
        <header>
            <nav>
                <ul className={`${styles.list} p-4`}>
                    <li className={`${styles.list_item} ${styles.nav_left}`}>
                        <Link to="/" className="p-5">
                            <BurgerIcon type={header.home.icon} />
                            <p className={`text text_type_main-default ${header.home.text} ml-2`}>Конструктор</p>
                        </Link> 
                        <Link to="/orders" className="ml-2 p-5">
                            <ListIcon type={header.orders.icon} />
                            <p className={`text text_type_main-default ${header.orders.text} ml-2`}>Лента заказов</p>
                        </Link>
                    </li>
                    <li className={styles.list_item}>
                        <Logo />
                    </li>
                    <li className={styles.list_item}>
                        <Link to="/profile" className="p-5">
                            <ProfileIcon type={header.profile.icon} />
                            <p className={`text text_type_main-default ${header.profile.text} ml-2`}>Личный кабинет</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;