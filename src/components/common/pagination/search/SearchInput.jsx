import { Search } from 'lucide-react';
import styles from './SearchInput.module.css';

export default function SearchInput({
                                        searchTerm,
                                        onSearchChange,
                                        onFocus,
                                        placeholder = "Search...",
                                        isLoading = false
                                    }) {
    return (
        <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={onSearchChange}
                onFocus={onFocus}
                className={styles.searchInput}
            />
            {isLoading && (
                <div className={styles.loadingSpinner}></div>
            )}
        </div>
    );
}
