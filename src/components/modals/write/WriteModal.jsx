import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { X, Upload } from 'lucide-react';

import Modal from '../../common/Modal/Modal.jsx';
import Button from "../../common/button/Button.jsx";

import styles from "./WriteModal.module.css";

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
    const [categories, setCategories] = useState([]);

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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = Array.from(e.dataTransfer.files).filter(file =>
            file.type.startsWith('image/')
        );

        if (files.length > 0) {
            setImages(prevImages => [...prevImages, ...files]);
        }
    };

    return (
        <Modal onClose={handleClose} contentClassName={styles.writeContent} >
            <form className={styles.form}>
                <input
                    type="text"
                    placeholder="Title"
                    required={true}
                />
                <div>
                    <ul className={styles.categoriesList}>
                        <li>Cat1</li>
                        <li>Cat2</li>
                        <li>Cat3</li>
                    </ul>
                    <Button className={styles.categoryButton}>
                        Add category
                    </Button>
                </div>
                <textarea
                    placeholder="Post content"
                    required={true}
                />
                <div>
                    <label
                        className={styles.uploadArea}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <div className={styles.uploadContent}>
                            <Upload style={{width: 40, height: 40, marginBottom: 8, color: '#b8c2d1'}} />
                            <p className={styles.uploadText}>
                                <span className={styles.uploadTextBold}>Click to upload</span> or drag and drop
                            </p>
                            <p className={styles.uploadHint}>PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.fileInput}
                        />
                    </label>
                </div>
                {previewUrls.length > 0 && (
                    <div className={styles.previewSection}>
                        <label className={styles.previewLabel}>
                            Preview ({images.length} {images.length === 1 ? 'image' : 'images'})
                        </label>
                        <div className={styles.previewGrid}>
                            {previewUrls.map((url, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <img
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className={styles.previewImage}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className={styles.removeButton}
                                    >
                                        <X style={{width: 16, height: 16}} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
