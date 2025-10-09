import {useState} from "react";
import { Routes, Route } from 'react-router-dom';

import Dashboard from "./components/layout/dashboard/Dashboard.jsx";
import PostsPage from "./components/content/posts/PostsPage.jsx";
import CategoriesPage from "./components/content/categories/CategoriesPage.jsx";
import UsersPage from "./components/content/users/UsersPage.jsx";
import CategoryPage from "./components/content/categories/CategoryPage.jsx";

function App() {
    const [users, setUser] = useState(null);
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route index element={<PostsPage />} />
                <Route path="categories" element={<CategoriesPage />}>
                    <Route path={":id"} element={<CategoryPage />}/>
                </Route>
                <Route path="users" element={<UsersPage />} />
            </Route>
        </Routes>
    )
}

export default App
