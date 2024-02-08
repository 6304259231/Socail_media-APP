import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import Moment from 'react-moment'


function Profile() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({})
  const [ postInput , setPostInput] = useState({
      heading : '',
      location : '',
      hashtags : ''
  }) 

  const postChangehandler = (e)=>{
    setPostInput({
      ...postInput, [e.target.name] : e.target.value
    })
  }

  const getUser = () => {
    axios.get('http://localhost:7200/myprofile', {
      headers: {
        'Authorization': localStorage.getItem('jwt')
      }
    }).then((response) => {
      setUser(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error, 'getting error')
    })
  }

  const submitPostHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:7200/createPost' , postInput,{
      headers: {
        'Authorization': localStorage.getItem('jwt')
      }
    }).then((response) => {
      setPosts(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error, 'getting error')
    })
    
  }

  const getPosts = ()=>{
    axios.get('http://localhost:7200/getposts', {
      headers: {
        'Authorization': localStorage.getItem('jwt')
      }
    }).then((response) => {
      setPosts(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error, 'getting error')
    })
  }

  // const updatePosts = ()=>{

  // }

  const handleLike = (id)=>{
      axios.post(`http://localhost:7200/likePost/${id}`)
      .then((res)=>{
        console.log(res.data);
        setPosts(res.data);
      }).catch((error)=>{
        console.log(error)
      })
  }

  const handleshare = (id)=>{
    axios.post(`http://localhost:7200/sharePost/${id}`)
    .then((res)=>{
      console.log(res.data);
      setPosts(res.data);
    }).catch((error)=>{
      console.log(error)
    })
}
const handlecomment = (id)=>{
  axios.post(`http://localhost:7200/commentPost/${id}`)
  .then((res)=>{
    console.log(res.data);
    setPosts(res.data);
  }).catch((error)=>{
    console.log(error)
  })
}




  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  return (
    <div className="profile-section">
      <div className='profile-card' style={{  width : '20%' , textAlign : 'left' }}>
      {
        user && (
          <center className="card" style={{minHeight : '250px' , borderRadius : '10px'}}>
            <center className='profile-avatar'>
            <img src={user.avatar} class="card-img-top" alt="avatar"/>
            </center>
              <div className="card-body " style={{padding : '2px'}}>
                <h5 className="card-text mt-1" style={{padding : '5px' , fontSize : '20px' , fontFamily : 'dosis'}} >{user.username}</h5>
                <p className="card-title mt-1" style={{fontFamily : 'monospace' , fontSize : '15px' , padding: '1px'}}>#{user.bio}</p>
                <p>
                <a href="#" className="btn btn-primary mt-4">My profile</a>
                </p>
              </div>
          </center>
        )
      }
      </div>
      <div className="posts-section">
        <div>
          {/* Button trigger modal */}
          <button type="button" className="btn btn-danger p-3 mr-2 mb-3 mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <medium> + Create post... </medium>
          </button>
          {/* Modal */}
          <div className="modal fade" id="exampleModal" tabIndex={-2} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{ 'position': 'sticky', 'top': '250px' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Your Post</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <form className='post-form' onSubmit={submitPostHandler}>
                    <input type='text' name="heading" placeholder="Heading" onChange={postChangehandler} style={{ width: '100%', height: '80px' }} />
                    <input type="text" name="hashtags" placeholder="Hashtags" onChange={postChangehandler} style={{ width: '100%' }} />
                    <input type="text" name="location" placeholder="Location" onChange={postChangehandler} style={{ width: '100%' }} />
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Post</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className='post-header'> Posts</p>
        { posts && posts.map((eachPost) => {
          let { heading, _id, username, hashtags, location, likes, shares, comments ,time } = eachPost;
          return (
            <div key={_id}>
              <div className="card mt-2 mb-4 posts-card">
              <center className="text-muted" style={{display : 'inline-block'}}><Moment format='DD MMMM YYYY'>{time}</Moment></center>
                <div className='profile-post-image' style={{marginLeft : '20px'}}>
                  <img
                    src="https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg"
                    className="image-fluid"
                    alt="..."
                  />
                  <div style={{ 'display': 'inline-block' }} className="card-title ml-3 p-2">
                    <p>{username}</p>
                  </div>
                </div>
                <div className="card-body" style={{ 'height': '50px' }}>
                  <p className="card" style={{ padding : '10px' , fontFamily : 'san-sarif' , fontSize : '18px' , marginTop : '5px'}}>{heading}</p>
                  <p className='hashtags' style={{ display : 'inline-block'}}>{hashtags}</p>
                  <p className='location'> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="30" fill="currentColor" className="bi bi-geo-alt location-icon" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg> <i style={{display : 'inline-block'}}> {location}</i></p>
                  <div className='post-icons-section' style={{marginTop : '10px' , marginLeft : '4px'}}>
                    <div className='post-icons'>
                      <div>
                        <p className='likes counts'>{likes}</p>
                        <button onClick={() => handleLike(_id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="46" fill="currentColor" className="bi bi-chat-square-heart-fill icon-item" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <p className='counts'>{comments}</p>
                        <button onClick={() => handlecomment(_id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="46" fill="currentColor" className="bi bi-chat-dots-fill icon-item" viewBox="0 0 16 16">
                            <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <p className='counts'>{shares}</p>
                        <button onClick={() => handleshare(_id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="46" fill="currentColor" className="bi bi-rocket-takeoff-fill icon-item" viewBox="0 0 16 16">
                            <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.578 3.578 0 0 0-.108-.563 2.22 2.22 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2.35 2.35 0 0 0-.16-.045 3.797 3.797 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.552 2.552 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526l.24-2.408Zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361.599.599.437 1.732-.36 2.531Z" />
                            <path d="M5.205 10.787a7.632 7.632 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="addComments" style={{ margin: '22px' }}>
                      <form>
                        <input
                          type="text"
                          className="text"
                          name="comment"
                          placeholder="Add a comment..."
                          size="30"
                        />
                        <button
                          type="submit"
                          className="post-btn btn-primary"
                          style={{ marginLeft: '20px', borderRadius: '11px' }}
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
export default Profile;
