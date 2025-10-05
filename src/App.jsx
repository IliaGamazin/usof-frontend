import Dashboard from "./components/layout/dashboard/Dashboard.jsx";
import {useState} from "react";

function App() {
    const [users, setUser] = useState(null);
    return (
        <>
            <Dashboard />
        </>
    )
}

export default App
