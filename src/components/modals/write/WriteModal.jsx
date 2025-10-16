import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from "react";

import Modal from '../../common/Modal/Modal.jsx';
import Button from "../../common/button/Button.jsx";

import styles from "./WriteModal.module.css";
import FileUpload from "./upload/FileUpload.jsx";
import CategoriesList from "./categories/CategoriesList.jsx";

export default function WriteModal() {
    const [, setSearchParams] = useSearchParams();

    const handleClose = () => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.delete('modal');
        setSearchParams(newParams);
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [categories, setCategories] = useState(["cat1", "cat2"]);

    useEffect(() => {
        if (images.length === 0) {
            setPreviewUrls([]);
            return;
        }

        const urls = images.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [images]);

    return (
        <Modal onClose={handleClose} contentClassName={styles.writeContent} >
            <form className={styles.form}>
                <textarea
                    placeholder="Title"
                    required={true}
                />

                <CategoriesList
                    categories={categories}
                    setCategories={setCategories}
                />

                <textarea
                    placeholder="Post content"
                    required={true}
                />
                <FileUpload
                    images={images}
                    setImages={setImages}
                    previewUrls={previewUrls}
                />
                <Button
                    type="submit"
                    className={styles.submitButton}
                >
                    Create post
                </Button>
            </form>
        </Modal>
    );
}
