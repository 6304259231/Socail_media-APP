import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Network.css'

function Network() {
    let [users, setUsers] = useState([])
    let [loading, setLoading] = useState(false)
   
    function getUsers() {
        setLoading(true)
        axios.get('http://localhost:7200/mynetwork', {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }).then((response) => {
            setLoading(false)
            setUsers(response.data)
        }).catch((error) => {
            setLoading(false);
            console.log(error)
        })
    }
    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className='network-section' style={{ margin: '25px auto', width: '95%', border: '2px solid black', boxShadow: '4px 4px 6px black' }}>
            <center style={{ fontFamily: 'monospace', fontSize: '32px', color: 'green', fontWeight: '400', margin: '20px' }}>Network</center>
            {
                loading && (
                    <center style={{ display: 'flex', margin: '20px auto', 'justifyContent': 'center' }} >
                        <div className="spinner-border text-primary m-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-border text-success m-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-border text-warning m-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </center>
                )
            }
            {
                !loading && users && users.map((user) => {
                    let { username, location, bio, avatar, _id } = user;
                    return (
                        <div className="card current-user" style={{ width: "35%", margin: '20px 30px', boxShadow: '4px 4px 5px black', cursor: 'pointer', display: 'inline-block' , minHeight : '280px' }} key={_id}>
                            <div className="card-body">
                                <div className='user-avatar-section mt-0'>
                                    <img src={avatar} alt="avatar" style={{ borderRadius: '3px dotted red' }} />
                                </div>
                                <h5 className="card-title" style={{ display: 'inline-block', marginTop: '10px', fontFamily: 'monospace', fontSize: '20px', marginLeft: '11px' }}>{username}</h5>
                                <h6 className="card-title" style={{ display: 'block', marginTop: '10px', fontFamily: 'monospace', fontSize: '16px', marginLeft: '11px' }}><i>ID</i> {_id}</h6>
                                <h6 className="card-title" style={{ display: 'block', marginTop: '10px', fontFamily: 'monospace', fontSize: '16px', marginLeft: '11px' }}>{bio}</h6>
                                <p className="card-text mt-1">
                                    <span> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg></span> <small
                                     className='text-muted' style={{ marginLeft : '5px'}}>{location}</small>
                                </p>
                                <button type="button" class="btn btn-outline-primary mt-3" style={{ display: 'block', marginLeft: '10px'}} >Follow</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Network