import {useSearchParams} from 'react-router-dom';
import {Link} from "react-router";

import Modal from '../../common/Modal/Modal.jsx';

const LoginForm = () => {
    return (
        <form>
            <h2>Log In</h2>
            <p>Welcome back to Mangoflow!</p>
            <input type="text" id="login" placeholder="Login" />
            <input type="email" id="email" placeholder="Email" />
            <input type="password" id="password" placeholder="Password" />
            <button type="submit">Log In</button>
            <Link to="?modal=auth/signup">Wanna sign up instead?</Link>
        </form>
    );
}

const SignupForm = () => {
    return (
        <form>
            <h2>Sign Up</h2>
            <p>Join Mangoflow today!</p>
            <input type="text" id="login" placeholder="Login" />
            <input type="email" id="email" placeholder="Email" />
            <input type="text" id="first-name" placeholder="Firstname" />
            <input type="text" id="last-name" placeholder="Lastname" />
            <input type="password" id="password" placeholder="Password" />
            <input type="password" id="confirm-password" placeholder="Confirm password" />
            <button type="submit">Create Account</button>
            <Link to="?modal=auth/login">Wanna sign in instead?</Link>
        </form>
    );
}



export default function AuthModal({ type }) {
    const [, setSearchParams] = useSearchParams();

    const handleClose = () => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.delete('modal');
        setSearchParams(newParams);
    };

    return (
        <Modal onClose={handleClose}>
            {type === 'login' && <LoginForm />}
            {type === 'signup' && <SignupForm />}
        </Modal>
    );
}