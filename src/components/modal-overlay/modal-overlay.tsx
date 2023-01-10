import React, {FC} from 'react'
import styles from './modal-overlay.module.css'

type TModalOverlayProps = {
    onClose: () => void;
};

const ModalOverlay : FC<TModalOverlayProps> = ({onClose}) => {
    return (
        <div className={styles.modal_overlay} onClick={onClose}>

        </div>
    )
}

export default ModalOverlay