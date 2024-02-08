import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Login.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login(props) {
    let navigate = useNavigate();
    let [input, setInput] = useState({
        username: '',
        password: ''
    })
    let changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    let submitHandler = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:7200/login", input)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem('jwt', res.data.jwt)
                    localStorage.setItem('payload', res.data.username)
                    toast.success('Logged in successfully')
                    setTimeout(() => {
                        navigate('/home')
                    }, 1000)
                }
            }).catch((error) => {
                console.log(error)
                if (error.response.data.exists) {
                    toast.error(error.response.data.exists)
                }
                if (error.response.data.password) {
                    return toast.error(error.response.data.password)
                }
            })
    }
    return (
        <center className='register-section mt-3' style={{ 'margin': '5px auto', boxShadow: '4px 3px 5px black', padding: '20px', width: "50%" }}>
             <center className='li-nav-aside'>
                        <li-icon
                            type="app-linkedin-bug-color-icon"
                            className=" "
                            size="large"
                            role="img"
                            aria-label="LinkedIn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                data-supported-dps="24x24"
                                fill="currentColor"
                                className="mercado-match"
                                width={64}
                                height={60}
                                focusable="false"
                            >
                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                            </svg>
                        </li-icon>
                    </center>
            <form onSubmit={submitHandler}>
                <div className="form-floating m-3" style={{ width: '80%' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='username'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">User name/email<span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="form-floating m-3" style={{ width: '80%' }}>
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name='password'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingPassword">Password <span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="col-auto register-btn">
                    <button type="submit" className="btn btn-primary m-3">Login</button>
                    <center className='mt-1'>
                        <p style={{ color: 'green', display: 'inline-block' }}>Don't have an account</p>
                        <button type="button" class="btn btn-outline-primary" style={{ display: 'inline-block', marginLeft: '10px' }} onClick={() => {
                            navigate('/register')
                        }}>Register</button>
                    </center>

                </div>
            </form>
            <ToastContainer />
        </center>
    )
}
export default Login