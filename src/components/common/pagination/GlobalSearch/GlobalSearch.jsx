import { useState, useEffect, useRef } from 'react';
import SearchInput from '../search/SearchInput';
import PostPreview from '../../../common/previews/post/PostPreview';
import UserPreview from '../../../common/previews/user/UserPreview';
import CategoryPreview from '../../../common/previews/category/CategoryPreview';
import { getPosts } from '../../../../services/PostService';
import { getUsers } from '../../../../services/UserService';
import { getCategories } from '../../../../services/CategoryService';
import styles from './GlobalSearch.module.css';

export default function GlobalSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState({
        post: null,
        user: null,
        category: null
    });
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchTerm.trim()) {
                setResults({ post: null, user: null, category: null });
                setShowResults(false);
                return;
            }

            setIsLoading(true);
            try {
                const [postsData, usersData, categoriesData] = await Promise.all([
                    getPosts(1, 1,
                        'title', 'ASC',
                        [],
                        null,
                        searchTerm
                    ).catch(() => ({ data: [] })),
                    getUsers(1, 1,
                        'login', 'ASC',
                        searchTerm
                    ).catch(() => ({ data: [] })),
                    getCategories(1, 1,
                        'title', 'ASC',
                        searchTerm
                    ).catch(() => ({ data: [] }))
                ]);

                setResults({
                    post: postsData.data[0] || null,
                    user: usersData.data[0] || null,
                    category: categoriesData.data[0] || null
                });

                setShowResults(true);
            }
            catch (error) {
                console.error('Error fetching search results:', error);
                setResults({ post: null, user: null, category: null });
                setShowResults(true);
            }
            finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleSearchFocus = () => {
        if (searchTerm.trim()) {
            setShowResults(true);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const hasResults = results.post || results.user || results.category;

    return (
        <div className={styles.globalSearch} ref={searchRef}>
            <SearchInput
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onFocus={handleSearchFocus}
                placeholder="Search posts, users, categories..."
                isLoading={isLoading}
            />

            {showResults && searchTerm.trim() && (
                <div className={styles.resultsDropdown}>
                    {isLoading ? (
                        <div className={styles.loadingMessage}>Searching...</div>
                    ) : hasResults ? (
                        <>
                            {results.category && (
                                <div className={styles.resultSection}>
                                    <h4 className={styles.sectionTitle}>Category</h4>
                                    <CategoryPreview
                                        id={results.category.id}
                                        title={results.category.title}
                                        description={results.category.description}
                                        posts={results.category.posts_count}
                                    />
                                </div>
                            )}

                            {results.user && (
                                <div className={styles.resultSection}>
                                    <h4 className={styles.sectionTitle}>User</h4>
                                    <UserPreview
                                        id={results.user.id}
                                        username={results.user.login}
                                        rating={results.user.rating}
                                        pfp={results.user.profile_picture}
                                    />
                                </div>
                            )}

                            {results.post && (
                                <div className={styles.resultSection}>
                                    <h4 className={styles.sectionTitle}>Post</h4>
                                    <PostPreview
                                        author_id={results.post.author_id}
                                        id={results.post.id}
                                        title={results.post.title}
                                        content={results.post.content}
                                        score={results.post.score}
                                        createdAt={results.post.created_at}
                                        categories={results.post.categories}
                                        withLink={true}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.noResults}>No results found</div>
                    )}
                </div>
            )}
        </div>
    );
}
