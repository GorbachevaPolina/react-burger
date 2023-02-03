import React, {useState, FC} from 'react'
import { useDispatch } from '../../services/types/hooks';
import { logout } from '../../services/actions/user';
import styles from './profile-side.module.css'
import { useHistory } from 'react-router-dom';

type T = {
    isActive: {
        profile: boolean,
        orders: boolean
    }
}

const ProfileSide: FC<T> = ({isActive}) => {
    // const [isActive, setIsActive] = useState<{profile: boolean; orders: boolean}>({
    //     profile: true,
    //     orders: false
    // })
    const history = useHistory()
    const dispatch = useDispatch()
    const handleLogout = () : void => {
        dispatch(logout())
    }
    const handleRedirect = (path : string) : void => {
        // setIsActive({
        //     profile: path === '/profile',
        //     orders: path === '/profile/orders'
        // })
        history.replace({pathname: path})
    }
    return (
        <div className={styles.container}>
            <p className={`text text_type_main-large mb-6 ${isActive.profile ? "" : "text_color_inactive"} ${styles.text}`} onClick={() => handleRedirect('/profile')}>
                Профиль
            </p>
            <p className={`text text_type_main-large mb-6 ${isActive.orders ? "" : "text_color_inactive"} ${styles.text}`} onClick={() => handleRedirect('/profile/orders')}>
                История заказов
            </p>
            <p className={`text text_type_main-large text_color_inactive ${styles.text}`} onClick={handleLogout}>
                Выход
            </p>

            {/* <p className="text text_type_main-default text_color_inactive mt-20"> */}
                {
                    isActive.orders ? 
                    <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе Вы можете просмотреть свою историю заказов</p> :
                    <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
                }
            {/* </p> */}
        </div>
    )
}

export default ProfileSide