import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterAndLogin = () => {
    const [name, setName] = useState('');
    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        if ( name === 'alias') {
          if (value.length < 2) {
            newErrors.name = "alias must be more than 2 characters";
          } else {
            delete newErrors.name;
          }
        }

        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
            if (!value || !emailPattern.test(value)) {
                newErrors.email = "Please enter a valid email address";
            } else {
                delete newErrors.email;
            }
        }        

        if (name === 'password') {
            // Example criteria: Password must be at least 8 characters long
            if (!value || value.length < 8) {
                newErrors.password = "Password must be at least 8 characters long";
            } else {
                delete newErrors.password;
            }
        }
        
        if (name === 'confirmPassword') {
            // Check if confirm password matches the password
            if (value !== password) {
                newErrors.confirmPassword = "Passwords do not match";
            } else {
                delete newErrors.confirmPassword;
            }
        }
        setErrors(newErrors); 
    };

    const validateForm = () => {
        const newErrors = {};
    
        if (name.length < 2) {
          newErrors.username = "Username must be more than 2 characters";
        }
        if (!email || email.length < 1) {
            newErrors.email = "Email is required";
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                newErrors.email = "Please enter a valid email address";
            }
        }    
        if (!password || password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }    
    
        return newErrors;
    };

    const postNewUser = () => {
        const newUser = {
        name,
        alias,
        email,
        password,
        confirmPassword
    };
    axios.post('http://localhost:8000/api/register', newUser, {withCredentials: true})
        .then(() => {
            navigate('/ideas')
        })
        .catch((error) => {
            console.error('Error adding user:', error)
        });
   }

   const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

    postNewUser();
}

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

const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }

    loginUser();
};

    return(
        <>
        <div>
         <form onSubmit={handleSignUpSubmit} className="border p-4 rounded shadow-sm">
                <div className="form-group mb-3">
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                        onChange={(e) => {
                            setName(e.target.value);
                            validateField('name', e.target.value);
                        }}
                        value={name}
                        required
                    />
                    {errors.name && <p style={{ color: 'white' }}>{errors.name}</p>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="alias">Alias</label>
                    <input
                        type="text"
                        className="form-control"
                        id="alias"
                        placeholder="Enter Alias"
                        onChange={(e) => {
                            setAlias(e.target.value);
                            validateField('name', e.target.value);
                        }}
                        value={alias}
                        required
                    />
                    {errors.alias && <p style={{ color: 'white' }}>{errors.alias}</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateField('password', e.target.value);
                        }}
                        value={password}
                        required
                    />
                    {errors.password && <p style={{ color: 'white' }}>{errors.password}</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="confirm password">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirm password"
                        placeholder="Confirm Password"
                        onChange={(e) => {setConfirmPassword(e.target.value);
                            validateField('confirm password', e.target.value);
                        }}
                        value={confirmPassword}
                        required
                    />
                    {errors.confirmPassword && <p style={{ color: 'white' }}>{errors.confirmPassword}</p>}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Sign Up
                </button>
            </form>
        </div>
        <div className="container mt-5">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleLoginSubmit} className="border p-4 rounded shadow-sm">
                    <div className="form-group mb-3">
                        <label htmlFor="Email">Enter Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
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
                            id="password"
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
                        Login
                    </button>
                </form>
            </div>
        
        </>
    )
}

export default RegisterAndLogin