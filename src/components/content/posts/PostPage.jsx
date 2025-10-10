import React from 'react';
import {useParams} from "react-router";

export default function PostPage() {
    const { id } = useParams();
    return (
        <div>
            <h1>Post {id}</h1>
        </div>
    );
}
