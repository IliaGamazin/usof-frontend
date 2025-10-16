import { X } from 'lucide-react';

import styles from "./CategoriesList.module.css";

export default function CategoriesList({categories, setCategories}) {
    const removeCategory = (index) => {
        setCategories(prevCategories => prevCategories.filter((_, i) => i !== index));
    };

    return (
        <div>
            {categories.length > 0 && (
                <div className={styles.categoriesSection}>
                    <label className={styles.previewLabel}>
                        {categories.length} {categories.length === 1 ? 'Category' : 'Categories'}
                    </label>
                    <div className={styles.categoriesGrid}>
                        {categories.map((category, index) => (
                            <div key={index} className={styles.categoryItem}>
                                <h5>{category}</h5>
                                <button
                                    type="button"
                                    onClick={() => removeCategory(index)}
                                    className={styles.removeButton}
                                >
                                    <X style={{width: 16, height: 16}} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}