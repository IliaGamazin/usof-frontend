import { useState, useEffect } from 'react';
import Button from '../../common/button/Button.jsx';
import CategoryFilter from '../../common/pagination/CategoryFilter/CategoryFilter.jsx';
import FileUpload from '../../common/upload/FileUpload.jsx';
import styles from './EditPostSection.module.css';

export default function EditPostSection({
                                            post,
                                            images,
                                            categories,
                                            onSave,
                                            onCancel
                                        }) {
    const [formData, setFormData] = useState({
        title: post.title,
        content: post.content,
        categories: categories || [],
        newImages: [],
        existingImages: images || [],
        filesToDelete: []
    });

    const [newImagePreviews, setNewImagePreviews] = useState([]);

    useEffect(() => {
        if (formData.newImages.length === 0) {
            setNewImagePreviews([]);
            return;
        }

        const urls = formData.newImages.map(file => URL.createObjectURL(file));
        setNewImagePreviews(urls);

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [formData.newImages]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRemoveExistingImage = (imageId) => {
        setFormData(prev => ({
            ...prev,
            existingImages: prev.existingImages.filter(img => img.id !== imageId),
            filesToDelete: [...prev.filesToDelete, imageId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
    };

    return (
        <form className={styles.editForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Title</label>
                <textarea
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={styles.titleInput}
                    rows="2"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Categories</label>
                <CategoryFilter
                    selectedCategories={formData.categories}
                    setSelectedCategories={(updater) => {
                        setFormData(prev => ({
                            ...prev,
                            categories: typeof updater === 'function' ? updater(prev.categories) : updater
                        }));
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Content</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className={styles.contentInput}
                    rows="10"
                    required
                />
            </div>

            {formData.existingImages.length > 0 && (
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Current Images</label>
                    <div className={styles.existingImagesGrid}>
                        {formData.existingImages.map((image) => (
                            <div key={image.id} className={styles.existingImageItem}>
                                <img
                                    src={`http://localhost:8080${image.file_path}`}
                                    alt="Post attachment"
                                    className={styles.existingImage}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExistingImage(image.id)} // Pass image.id instead of image.file_path
                                    className={styles.removeImageButton}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Add New Images</label>
                <FileUpload
                    images={formData.newImages}
                    setImages={(updater) => {
                        setFormData(prev => ({
                            ...prev,
                            newImages: typeof updater === 'function' ? updater(prev.newImages) : updater
                        }));
                    }}
                    previewUrls={newImagePreviews}
                />
            </div>

            <div className={styles.formActions}>
                <Button type="submit" className={styles.saveButton}>
                    Save Changes
                </Button>
                <Button type="button" onClick={onCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
