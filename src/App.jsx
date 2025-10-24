import { Routes, Route } from 'react-router-dom';

import Dashboard from "./components/layout/dashboard/Dashboard.jsx";
import PostsPage from "./components/content/posts/PostsPage.jsx";
import CategoriesPage from "./components/content/categories/CategoriesPage.jsx";
import UsersPage from "./components/content/users/UsersPage.jsx";
import CategoryPage from "./components/content/categories/CategoryPage.jsx";
import UserPage from "./components/content/users/UserPage.jsx";
import PostPage from "./components/content/posts/PostPage.jsx";
import CommentsPage from "./components/content/comments/CommentsPage.jsx";
import CommentPage from "./components/content/comments/CommentPage.jsx";
import NotFound from "./components/content/notfound/NotFound.jsx";
import {Navigate} from "react-router";
import ResetPassword from "./components/content/reset/ResetPassword.jsx";

function App() {
    return (
        <Routes>
            <Route path="/password-reset/:token" element={<ResetPassword />} />
            <Route path="/" element={<Dashboard />}>
                <Route index element={<Navigate to="/posts/trending" replace />} />

                <Route path="categories" element={<CategoriesPage />} />
                <Route path={"categories/:id"} element={<CategoryPage />} />

                <Route path="users" element={<UsersPage />} />
                <Route path={"users/:id"} element={<UserPage />}/>

                <Route path="posts" element={<PostsPage order={"score"} />} />

                <Route path="posts/trending" element={<PostsPage order={"score"}/>} />
                <Route path="posts/recent" element={<PostsPage order={"created_at"}/>} />
                <Route path="posts/favourite" element={<PostsPage />} />
                <Route path="posts/followed" element={<PostsPage />} />
                <Route path="posts/my" element={<PostsPage />} />

                <Route path={"posts/:id"} element={<PostPage />}/>

                <Route path="comments" element={<CommentsPage />} />
                <Route path={"comments/:id"} element={<CommentPage />}/>

                <Route path="*" element={<NotFound />}/>
            </Route>
        </Routes>
    )
}

export default App
