import React, {FC} from 'react'
import { useDispatch } from '../../services/types/hooks';
import { logout } from '../../services/actions/user';
import styles from './profile-side.module.css'
import { useHistory } from 'react-router-dom';

type TProfileProps = {
    isActive: {
        profile: boolean,
        orders: boolean
    }
}

const ProfileSide: FC<TProfileProps> = ({isActive}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const handleLogout = () : void => {
        dispatch(logout())
    }
    const handleRedirect = (path : string) : void => {
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

            <p className="text text_type_main-default text_color_inactive mt-20">
                {
                    isActive.orders ? 
                    <>В этом разделе Вы можете просмотреть свою историю заказов</> :
                    <>В этом разделе вы можете изменить свои персональные данные</>
                }
            </p>
        </div>
    )
}

export default ProfileSide