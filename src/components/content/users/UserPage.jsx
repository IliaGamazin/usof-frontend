import React from 'react';
import {useParams} from "react-router";

export default function UserPage() {
    const { id } = useParams();
    return (
        <div>
            <h1>User {id}</h1>
        </div>
    );
}
