import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { getCategories } from '../../../../services/CategoryService.js';
import CategoriesList from '../../categories/CategoriesList.jsx';
import styles from './CategoryFilter.module.css';

export default function CategoryFilter({ selectedCategories, setSelectedCategories }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            if (!searchTerm.trim()) {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await getCategories(1, 10, 'title', 'asc', searchTerm);
                const filteredSuggestions = response.data.filter(
                    category => !selectedCategories.some(selected => selected.id === category.id)
                );
                setSuggestions(filteredSuggestions);

                if (filteredSuggestions.length > 0) {
                    setShowSuggestions(true);
                }
                else {
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setSuggestions([]);
                setShowSuggestions(true);
            }
            finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchCategories, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm, selectedCategories]);

    const addCategory = (category) => {
        if (!selectedCategories.some(selected => selected.id === category.id)) {
            setSelectedCategories(prev => [...prev, {
                id: category.id,
                title: category.title
            }]);
            setSearchTerm('');
            setShowSuggestions(false);
            setSuggestions([]);
        }
    };

    const handleSearchFocus = () => {
        if (searchTerm.trim() && (suggestions.length > 0 || isLoading)) {
            setShowSuggestions(true);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.trim() && suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    return (
        <div className={styles.categoryFilter}>
            <div className={styles.searchContainer} ref={searchRef}>
                <div className={styles.searchInputWrapper}>
                    <Search className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        className={styles.searchInput}
                    />
                    {isLoading && (
                        <div className={styles.loadingSpinner}></div>
                    )}
                </div>

                {showSuggestions && (suggestions.length > 0 || searchTerm.trim()) && (
                    <div className={styles.suggestionsDropdown}>
                        {isLoading ? (
                            <div className={styles.loadingMessage}>Loading categories...</div>
                        ) : suggestions.length > 0 ? (
                            suggestions.map((category) => (
                                <div
                                    key={category.id}
                                    className={styles.suggestionItem}
                                    onClick={() => addCategory(category)}
                                >
                                    <span className={styles.suggestionText}>{category.title}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>No categories found</div>
                        )}
                    </div>
                )}
            </div>

            <CategoriesList
                categories={selectedCategories}
                setCategories={setSelectedCategories}
            />
        </div>
    );
}