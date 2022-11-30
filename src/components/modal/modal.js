import React from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById('react-modals')

const Modal = ({children, header, onClose}) => {
    return ReactDOM.createPortal(
        <>
            <div className={`${styles.modal} p-10`}>
                <div className={styles.modal_header}>
                    <p className="text text_type_main-large">{header}</p>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                <div className={styles.modal_content}>
                {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose}/>
        </>,
        modalRoot
    )
}

export default Modal;