import React from 'react';
import {useParams} from "react-router";

export default function CommentPage() {
    const { id } = useParams();
    return (
        <div>
            <h1>Comment {id}</h1>
        </div>
    );
}
