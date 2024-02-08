import React, { useEffect, useState } from 'react'
import './Settings.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Settings({ setLogin }) {
  let [user, setUser] = useState({})
  let [updateUser, setUpdateUser] = useState({
    username: '',
    bio: '',
    email: '',
    location: '',
  })


  const updateHandler = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const getUser = () => {
    axios.get('http://localhost:7200/myprofile', {
      headers: {
        'Authorization': localStorage.getItem('jwt')
      }
    }).then((response) => {
      console.log(response.data)
      setUser(response.data)
    }).catch((error) => {
      console.log(error, 'getting error')
    })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put('https://lovechat-hq0q.onrender.com/update-profile', updateUser, {
      headers: {
        'Authorization': localStorage.getItem('jwt'),
      },
    }).then((response) => {
      toast.success('Your account updated')
      getUser();
    }).catch((error) => {
      console.error('Error updating user details:', error);
    });
  };

  useEffect(() => {
    getUser();
  }, [])

  let deleteHandler = (e) => {
    e.preventDefault();
    axios.delete('https://lovechat-hq0q.onrender.com/delete-account', {
      headers: {
        'Authorization': localStorage.getItem('jwt'),
      },
    }).then((response) => {
      toast.success(response.data.deleteAccount)
    }).catch((error) => {
      console.error('Error updating user details:', error);
    });
  };

  return (
    <center style={{}}>
      <div className="card mb-4 mt-4 setting-section" style={{ width: "50%", borderRadius: '12px' }}>
        <div className='profile-image'>
          <img src="https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg" className="card-img-top" alt="..." style={{ borderRadius: '50%', border: '3px inset tomato' }} />
          <p> <span style={{ fontFamily: 'monospace', fontSize: '20px' }}> ID :</span> {user._id}</p>
          <button type="button" className="btn btn-danger pl-30 mb-3 mt-2 ml-20 " data-bs-toggle="modal" data-bs-target="#exampleModal2">
            <small className=''> Edit </small>
          </button>
        </div>
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a href="/" className="nav-link active" aria-current="true">
                  Active
                </a>
              </li>
              <li className="nav-item">
                <a href='/'
                  className="nav-link disabled"
                  tabIndex={-1}
                  aria-disabled="true"> Blocked </a>
              </li>
            </ul>
          </div>
          <div className="card-body text-center" style={{ textAlign: 'left' , height : '300px'}}>
            <h5 className="card-title">  <p className="card-text">
              <p> <span style={{ fontFamily: 'monospace', fontSize: '24px' }}> {user.username} </span> </p>
              <span style={{ fontFamily: 'monospace', fontSize: '20px' }}> {user.bio} </span>
            </p></h5>
            <p className="card-text mt-2">
              <span> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg></span> <span style={{ marginLeft: '15px' }}>{user.email}</span>
            </p>
            <p className="card-text mt-2" style={{display : 'block'}}>
              <span> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg></span> {user.location}
            </p>
            <button type="button" class="btn btn-outline-primary m-5" onClick={() => {
              navigate('/')
            }}>Log out</button>
            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" >Delete Account</button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{ fontFamily: 'monospace' }}>
                Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body" style={{ color: 'red', fontSize: '20px' }}> Your Account will be deleted permanently </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => {
                deleteHandler(e)
                navigate('/');
              }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal2" tabIndex={-2} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ 'position': 'sticky', 'top': '250px' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <center className="modal-body">
              <form className='post-form' onSubmit={handleFormSubmit}>
                <input type="text" name="username" placeholder="User name" className='m-2' onChange={updateHandler} style={{ width: '80%', borderRadius: '5px' }} />
                <input type='text' name="bio" placeholder="bio" className='m-2' onChange={updateHandler} style={{ width: '80%', height: '50px', borderRadius: '5px' }} />
                <input type="text" name="email" placeholder="email" className='m-2' onChange={updateHandler} style={{ width: '80%', borderRadius: '5px' }} />
                <input type="text" name="location" placeholder="Location" className='m-2' onChange={updateHandler} style={{ width: '80%', borderRadius: '5px' }} />
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Set</button>
                </div>
              </form>
            </center>
          </div>
        </div>
      </div>
      <ToastContainer />
    </center>
  )
}

export default Settings