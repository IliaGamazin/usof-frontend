import {newPost} from "../../../services/PostService.js";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import Modal from "../../common/modal/Modal.jsx";

import styles from "./WriteModal.module.css";
import CategoryFilter from "../../common/pagination/CategoryFilter/CategoryFilter.jsx";
import FileUpload from "../../common/upload/FileUpload.jsx";
import Button from "../../common/button/Button.jsx";

import {useAuthFetch} from "../../../services/Api.js";

export default function WriteModal() {
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();
    const authFetch = useAuthFetch();
    const handleClose = () => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.delete('modal');
        setSearchParams(newParams);
    };

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categories: [],
        images: []
    });

    const [previewUrls, setPreviewUrls] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (formData.images.length === 0) {
            setPreviewUrls([]);
            return;
        }

        const urls = formData.images.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [formData.images]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('content', formData.content);

            formData.categories.forEach(cat => {
                submitData.append('categories', cat.id);
            });

            formData.images.forEach(image => {
                submitData.append('images', image);
            });

            const result = await newPost(authFetch, submitData);
            console.log('Post created successfully!', result);
            navigate(`/posts/${result.post.id}`);
        }
        catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal onClose={handleClose} contentClassName={styles.writeContent} >
            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required={true}
                />

                <CategoryFilter
                    selectedCategories={formData.categories}
                    setSelectedCategories={(updater) => {
                        setFormData(prev => ({
                            ...prev,
                            categories: typeof updater === 'function' ? updater(prev.categories) : updater
                        }));
                    }}
                />

                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Post content"
                    required={true}
                />
                <FileUpload
                    images={formData.images}
                    setImages={(updater) => {
                        setFormData(prev => ({
                            ...prev,
                            images: typeof updater === 'function' ? updater(prev.images) : updater
                        }));
                    }}
                    previewUrls={previewUrls}
                />

                {error && (
                    <h3 className={styles.error}>{error}</h3>
                )}

                <Button
                    type="submit"
                    className={styles.submitButton}
                >
                    Create Post
                </Button>
            </form>
        </Modal>
    );
}