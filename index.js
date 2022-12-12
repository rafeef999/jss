
//new
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}))

// Converting JSON to JavaScript Objects
app.use(bodyParser.json());

// Accessing Cookies from user's Browser
app.use(cookieParser())

// Telling our backend that the static files of our website are going to be in which folder!!
app.use(express.static('public'));

//Template Engines 


const { tokenValidation } = require('./userToken');

const userController=require('./userController');
const tweetController=require('./TweetController');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* route to handle login and registration */
app.post('/api/register',userController.register);
app.post('/api/authenticate',userController.authenticate);
app.get('/api/userInfo',userController.userInfo);
app.put('/api/EditUser',userController.EditUserInfo);
app.put('/api/changePassword',userController.changePassword);
app.post('/api/follow',userController.newFollow);
app.delete('/api/unfollow',userController.unfollow);
app.get('/api/followedusers',userController.followed);

app.post('/api/newTweet',tweetController.create_tweet);
app.delete('/api/deleteTweet',tweetController.delete_tweet);
app.put('/api/edit',tweetController.edit_tweet);
app.get('/api/allTweets',tweetController.allTweets);
app.get('/api/userTweets',tweetController.userTweets);


app.listen(3000);