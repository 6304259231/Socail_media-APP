import express, { request } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser';
import compression from 'compression';
// import multer from 'multer';


let port = 7200;
let uri = "mongodb+srv://vishnumothukuru:Vittuvishnujob123@cluster0.ssdlkhv.mongodb.net/social_media?retryWrites=true&w=majority";
let app = express();

// let upload = new multer()
// let storage = multer.diskStorage({
//     destination : '/avatars',
//     filename : (request , file , cb)=>{
//         cb(null , Date.now()+file.name)
//     }
// })

// multer({
//     storage : storage
// })

app.use(compression());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors("*"));
app.listen(port, () => {
    console.log('server has started at', port);
});

mongoose.connect(uri).then(() => {
    console.log('db connection established');
});

// creation a users schema/model
const usersModel = mongoose.model("users", {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    location: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg',
    }
});

// creation of message schema 
let postsModel = mongoose.model('posts', {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel'
    },
    username: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    hashtags: {
        type: String,
        required: true
    }

})

app.post("/register", async (request, response) => {
    try {
        let { username, password, confirmpassword, email, location, bio, avatar } = request.body;
        console.log(request.body);
        let exists = await usersModel.findOne({ email });
        if (exists) {
            return response.status(400).json({ exists: 'user-already exists' })
        }
        else {
            let newuser = new usersModel({
                email,
                username,
                password,
                confirmpassword,
                bio,
                location,
                avatar
            });
            await newuser.save();
            response.json({ success: 'Registered successfully' })
        }
    } catch (error) {
        console.log(error)
        response.status(400).send('oops internal server error');
    }
});

app.post("/login", async (request, response) => {
    try {
        let { username, password } = request.body;
        let exists = await usersModel.findOne({ username })
        if (!exists) {
            return response.status(400).json({ exists: 'User Not found' })
        }
        if (exists.password != password) {
            response.status(400).json({ password: 'Password is incorrect ' })
        }
        let payload = {
            userid: exists.id,
            username: exists.username
        }

        let key = '9132b677f83c35b341e056a84e0c53b5d568e43b8005eed030c2a60c3cd6498c10df2312b7c428d7cb9126876d985a43b2b1d0f3fe3d23163531f9fb67e8019b';
        jwt.sign(payload, key, (err, token) => {
            if (err) {
                console.log('token error', err)
            }
            else {
                response.status(200).json({
                    success: 'Logged in successfully',
                    jwt: token,
                    username: exists.username
                })
            }
        })
    }
    catch (error) {
        console.log(error.data)
    }
})

async function verifyToken(req, res, next) {
    try {
        let key = '9132b677f83c35b341e056a84e0c53b5d568e43b8005eed030c2a60c3cd6498c10df2312b7c428d7cb9126876d985a43b2b1d0f3fe3d23163531f9fb67e8019b';
        let token = req.headers.authorization;
        if (!token || token == undefined || token == null) {
            res.status(400).json({ tokenError: "token not found for verification" })
        }
        else {
            jwt.verify(token, key, (err, payload) => {
                if (err) {
                    console.log('verification error', err)
                }
                else {
                    req.payload = payload;
                    next();
                }
            })
        }
    }
    catch (error) {
        console.log(error, 'Decode error')
    }
}

app.get('/myprofile', verifyToken, async (request, response) => {
    try {
        let user = await usersModel.findOne({ _id: request.payload.userid })
        return response.status(200).json(user)
    }
    catch (error) {
        console.log('user-Error', error)
    }

})

app.post('/createPost', verifyToken, async (req, res) => {
    try {
        let { heading, hashtags, location } = req.body;
        let user = await usersModel.findById(req.payload.userid)
        let newPost = new postsModel({
            username : user.username,
            userid : user.userid,
            heading,
            hashtags,
            location,
           
        })
        await newPost.save();
        let allPosts = await postsModel.find();
        return res.status(200).json(allPosts)
    }
    catch(error){
        console.log(error)
        res.json({postError : 'posting error'})
    }
})

app.get('/getposts' , verifyToken, async (req, res)=>{
    try{
        let allPosts = await postsModel.find();
        return res.status(200).json(allPosts)
    }
    catch(error){
        console.log(error)
        res.json({getError : 'getting error'})
    }
})

app.post('/likePost/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await postsModel.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
        let allPosts = await postsModel.find();
        return res.status(200).json(allPosts)
    } catch (error) {
        console.log(error);
        res.json({ likeError: 'Error while processing like' });
    }
});
app.post('/sharePost/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await postsModel.findByIdAndUpdate(postId, { $inc: { shares: 1 } }, { new: true });
        let allPosts = await postsModel.find();
        return res.status(200).json(allPosts)
    } catch (error) {
        console.log(error);
        res.json({ shareError: 'Error while processing like' });
    }
});
app.post('/commentPost/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await postsModel.findByIdAndUpdate(postId, { $inc: { comments: 1 } }, { new: true });
        let allPosts = await postsModel.find();
        return res.status(200).json(allPosts)
    } catch (error) {
        console.log(error);
        res.json({ commentError: 'Error while processing like' });
    }
});

app.get('/mynetwork', verifyToken, async (request, response) => {
    try {
        let current = request.payload.userid
        let user = await usersModel.find({ _id : {$ne : current}}).lean()
        return response.status(200).json(user)
    }
    catch (error) {
        response.status(400).json({ error : 'getting error'})
        console.log('user-Error', error)
    }

})
app.get('/myprofile', verifyToken, async (request, response) => {
    try {
        console.log(request.payload)
        let user = await usersModel.findOne({ _id: request.payload.userid })
        return response.status(200).json(user)
    }
    catch (error) {
        console.log('user-Error', error)
    }

})

app.delete('/delete-account', verifyToken, async (request, response) => {
    try {
        await usersModel.findByIdAndDelete(request.payload.userid)
        response.status(200).json({ deleteAccount: 'Account deleted successfully ' })
    }
    catch (error) {
        response.status(400).json({ error: 'sever error ! try after some time' })
    }
})

app.put('/update-profile', verifyToken, async (request, response) => {
    try {
        const userId = request.payload.userid;
        const updateData = request.body;
        const updatedUser = await usersModel.findByIdAndUpdate(userId, updateData, { new: true });
        response.json({updatedUser});
    }
    catch (error) {
        console, log('updation error', error)
    }
})