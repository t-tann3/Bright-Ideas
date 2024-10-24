import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const loginUser = () => {
        const loginInfo = {
            email,
            password
        };
    
        axios.post('http://localhost:8000/api/login', loginInfo)
            .then((response) => {
                console.log('User logged in successfully', response);
                setEmail('');
                setPassword('');
                navigate('/ideas');
            })
            .catch((error) => {
                console.log('Error logging in:', error);
            });
    };
    
    const validateField = (field, value) => {
        let formErrors = { ...errors };
        if (field === 'email' && !value.includes('@')) {
            formErrors.email = 'Please enter a valid email address';
        } else {
            delete formErrors.email;
        }
        if (field === 'password' && value.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
        } else {
            delete formErrors.password;
        }
        setErrors(formErrors);
    };

    const validateForm = () => {
        const formErrors = {};
        if (!email.includes('@')) {
            formErrors.email = 'Please enter a valid email address';
        }
        if (password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
        }
        return formErrors;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
    
        loginUser();
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleLoginSubmit} className="border p-4 rounded shadow-sm">
                    <div className="form-group mb-3">
                        <label htmlFor="Email">Enter Email</label>
                        <input
                            type="text"
                            className="form-control"
                            // id="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateField('email', e.target.value);
                            }}
                            value={email}
                            required
                        />
                        {errors.email && <p style={{ color: 'white' }}>{errors.email}</p>}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Enter Password</label>
                        <input
                            type="password"
                            className="form-control"
                            // id="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validateField('password', e.target.value);
                            }}
                            value={password}
                            required
                        />
                        {errors.password && <p style={{ color: 'white' }}>{errors.password}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Log In
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
