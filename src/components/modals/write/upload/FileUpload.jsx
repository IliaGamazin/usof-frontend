import {X, Upload} from "lucide-react";

import styles from "./FileUpload.module.css";

export default function FileUpload({ images, setImages, previewUrls }) {
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    return (
        <>
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
        </>
    )
}
