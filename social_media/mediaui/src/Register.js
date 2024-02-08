import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Register.css'

function Register() {
    let navigate = useNavigate();
    let [avatar , setAvatar] = useState(null)
    let [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        bio: "",
        location: "",
    })
    let imageHandler = (e)=>{
        setAvatar(e.target.files[0])
    }
    let changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    let submitHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('avatar' ,avatar )

        if (!input.username || !input.email || !input.password || !input.confirmpassword || !input.location) {
            return toast.error('Please provide all the details');
        }
        if (input.password !== input.confirmpassword) {
            return toast.error('Passwords are not correct');
        }
        axios.post('http://localhost:7200/register', { input , formData})
            .then((res) => {
                if (res.data.success) {
                    toast.success('Registered successfully');
                    setTimeout(() => {
                        navigate('/');
                    }, 1500)
                }
            })
            .catch((error) => {
                if (error.response) {
                    return toast.error(error.response.data.exists)
                }
                else {
                    return toast.error(' ! server error')
                }
            })
    }
    return (
        <div className='register-section mt-3' style={{ 'margin': '5px auto', boxShadow: '4px 3px 5px black', padding: '10px', width: "80%" }}>
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
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='username'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">User name <span style={{ color: 'red' }}>*</span></label>
                </div>

                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='email'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Email address <span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
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
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="confirmpassword"
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingPassword">Confirm Password <span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='bio'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Bio <span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='location'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Location <span style={{ color: 'red' }}>*</span></label>
                </div>
                <center>
                    <input type='file' name='image' onChange={imageHandler}/>
                    <label htmlFor='image' style={{display : 'block'}}>Choose avatar</label>
                </center>
                <center className="col-auto register-btn">
                    <button type="submit" className="btn btn-primary m-3" style={{ width: '50%', fontSize: '22px' }}>Register</button>
                </center>
            </form>
            <ToastContainer />
        </div>
    )
}
export default Register