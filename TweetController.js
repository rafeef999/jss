const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();
const connection = require('./config');
module.exports.create_tweet=function(req,res){
    const userToken = req.cookies.userToken;
    
    if (userToken) {
        verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
consol.log("no user");
            }
            else {
                let username = decoded.result;
                    connection.query('SELECT * FROM users WHERE Username = ?', [username], (err,data) => {
                            const Tweets={
                                "userid":data[0].id,
                                "description":req.body.description,
                                "hashtag":req.body.hashtag,
                                "date":req.body.date
                            }
                            connection.query('INSERT INTO tweets SET ?',Tweets, function (error, results, fields) {
                        
                                if (error) {
                                    res.json({
                                        status:false,
                                        message:'there are some error with query'
                                    })
                                  }else{
                                      res.json({
                                        status:true,
                                        data:results,
                                        message:'Tweet is created succssefully! '
                                    })
                                  }
                            })
                            })  
                                            }
                    });

            
    
  
}else{
    res.json({
        status:false,
        message:'not loged in'
    })
}}

module.exports.delete_tweet=function(req,res){
    const {id} = req.body;

    const userToken = req.cookies.userToken;
    
    if (userToken) {
        verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
consol.log("no user");
            }
            else {
                let username = decoded.result;
                    connection.query('SELECT * FROM users WHERE ID = ?', [id], (err,data) => {
                        connection.query('Delete FROM tweets WHERE ID =',id, function (error, results, fields) {

                            if (error) {
                                res.json({
                                    status:false,
                                    message:'there are some error with query'
                                })
                              }else{
                                  res.json({
                                    status:true,
                                    data:results,
                                    message:'Tweet is created succssefully! '
                                })
                              }
                            });
                            })
                             
                                            }
                    });

}else{
    res.json({
        status:false,
        message:'not loged in'
    })

}

   
  
}

module.exports.edit_tweet=function(req,res){
    const {id} = req.body;

    const userToken = req.cookies.userToken;
    
    if (userToken) {
        verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
consol.log("no user");
            }
            else {
                let username = decoded.result;
                    connection.query('SELECT * FROM tweets WHERE ID = ?', [id], (err,data) => {
                        const {description,hashtag,date}=req.body;
                          
                           const     id=data[0].ID;
                            
                            connection.query("UPDATE  `tweets` SET `Descriotion`=('"+description+"') `Hashtag`=('"+hashtag+"')`Date`=('"+data+"') WHERE ID = " + id, function (error, results, fields) {
                        
                                if (error) {
                                    res.json({
                                        status:false,
                                        message:'there are some error with query'
                                    })
                                  }else{
                                      res.json({
                                        status:true,
                                        data:results,
                                        message:'Tweet is created succssefully! '
                                    })
                                  }
                            })
                            })  
                                            }
                    });

            
    
  
}else{
    res.json({
        status:false,
        message:'not loged in'
    })
}}



module.exports.allTweets=function(req,res){
    const {id} = req.body;

    const userToken = req.cookies.userToken;
    
    if (userToken) {
        verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
consol.log("no user");
            }
            else {
                    connection.query('SELECT * FROM tweets ',  (err,data) => {
                          
                        res.json(data);})
                    }
                })}
            
    
  
else{
    res.json({
        status:false,
        message:'not loged in'
    })
}}

module.exports.userTweets=function(req,res){
    const {userid} = req.body;

    const userToken = req.cookies.userToken;
    
    if (userToken) {
        verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
consol.log("no user");
            }
            else {
                    connection.query('SELECT * FROM tweets WHERE Userid ',[userid], (err,data) => {
                          
                        res.json(data);})
                    }
                })}
            
    
  
else{
    res.json({
        status:false,
        message:'not loged in'
    })
}}

