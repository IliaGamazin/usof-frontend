import { createPortal } from 'react-dom';

import Button from "../button/Button.jsx";

import styles from "./Modal.module.css"

export default function Modal({ onClose, children }) {
    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <Button
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    &times;
                </Button>
                {children}
            </div>
        </div>,
        document.body
    );
}