const mysql = require('mysql');
const { hashSync, genSaltSync, compareSync ,compare} = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();
const connection = require('./config');


module.exports.register = (req, res) => {
  const {username, fullname, birthday, password,address} = req.body;

  //Generating salt for Hashing
  const salt = genSaltSync(10);

  //Hashing the password
  const hashPassword = hashSync(password, salt);
const user={
  "username":username,
  "fullname":fullname,
  "birthday":birthday,
  "password":hashPassword,
  "address":address
}

  // Connecting to DB
 
          connection.query('select username from users where username = ?', [username], (err, data) => {
              console.log(data)
              if (data.length != 0) {
                  res.json('Already Registered')

              }
              else{
                  connection.query('INSERT INTO users SET ?', user, (err, register) => {
                    res.json({message:'registered!!'})

                      if(err){
                          res.json({message:'Something went wrong, Please try again'})
                      }
                    
                  })
              }
          })


      }
 

module.exports.authenticate = (req,res) => {
  const {username, password} = req.body;
  
          connection.query('SELECT * FROM users WHERE Username = ?', [username], (err,data) => {
              if(err){
                  res.json({message: 'username or Password is Incorrect'});
              }
              if(data.length == 0){
                  res.json({message: `username Doesn't exist, Try to register`})
              }
              else{
                  const checkPassword = compareSync(password, data[0].Password);

                  if(checkPassword){

                  //Creating the token for logged in user

                      const userToken = sign({result: data[0].username}, process.env.SECRET_KEY, {
                          expiresIn: '600s'
                      })

                      //Sending the token to user's cookie
                      res.cookie('userToken', userToken, {
                          expires: new Date(Date.now() + 600000),
                          httpOnly: true
                      })
                      res.json({message: `Signed up`})

                      console.log(userToken);

                  }

              };
          });
      };

      module.exports.userInfo = (req,res) => {
        const {id} = req.cookie.userToken;
        
                connection.query('SELECT * FROM users WHERE Userid = ?', [id], (err,data) => {
                    
      res.json(data);
    
                    
                });
            };


            module.exports.EditUserInfo=function(req,res){
              const {userid} = req.cookie.userToken;
          
              const userToken = req.cookies.userToken;
              
              if (userToken) {
                  verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
                      if (err) {
          consol.log("no user");
                      }
                      else {
                          let username = decoded.result;
                              connection.query('SELECT * FROM users WHERE Userid = ?', [userid], (err,data) => {
                                const user={
                                  "username":username,
                                  "fullname":fullname,
                                  "birthday":birthday,
                                  "address":address
                                } 
                                      connection.query("UPDATE  `users` SET `Password`=('"+password+"')  WHERE Userid = " + userid, function (error, results, fields) {
                                  
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


          module.exports.changePassword=function(req,res){
            const {userid} = req.cookie.userToken;
        
            const userToken = req.cookies.userToken;
            
            if (userToken) {
                verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
                    if (err) {
        consol.log("no user");
                    }
                    else {
                        
                             const password=req.body.password;
                                    connection.query( "UPDATE `users` SET `Password` = ('" + password + "') WHERE Userid = " + userid,
                                    function (error, results, fields) {
                                
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
                                   
                                                    }
                            });
        
                    
            
          
        }else{
            res.json({
                status:false,
                message:'not loged in'
            })
        }}


        module.exports.newFollow=function(req,res){
          const {userid} = req.cookie.userToken;
      
          const userToken = req.cookies.userToken;
          
          if (userToken) {
              verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
                  if (err) {
      consol.log("no user");
                  }
                  else {
                      
                    const follower={
                      "followedid":req.body,
                      "userid":req.cookie.userToken
                    
                    }
                    
                      
                              
                                      connection.query('INSERT INTO followers SET ?', follower, (err, data) => {
                                        res.json({message:'followed'})
                    
                                          if(err){
                                              res.json({message:'Something went wrong, Please try again'})
                                          }
                                        
                                      })
                                 
                                                  }
                          });
      
                  
          
        
      }else{
          res.json({
              status:false,
              message:'not loged in'
          })
      }}
     


      module.exports.newFollow=function(req,res){
        const {userid} = req.cookie.userToken;
    
        const userToken = req.cookies.userToken;
        
        if (userToken) {
            verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
    consol.log("no user");
                }
                else {
                    
                  const {followedid} = req.body;
                  const {userid}=req.cookie.userToken;
                  const follower={
                    "followedid":req.body,
                    "userid":req.cookie.userToken
                  
                  }
                  
                    
                            
                                    connection.query('DELETE FROM `followers` WHERE  followedid ?', followedid, (err, data) => {
                                      res.json({message:'followed'})
                  
                                        if(err){
                                            res.json({message:'Something went wrong, Please try again'})
                                        }
                                      
                                    })
                               
                                                }
                        });
    
                
        
      
    }else{
        res.json({
            status:false,
            message:'not loged in'
        })
    }}
   

              

 
      
  
module.exports.followed=function(req,res){
  const {userid} = req.cookie.userToken;

  const userToken = req.cookies.userToken;
  
  if (userToken) {
      verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
          if (err) {
consol.log("no user");
          }
          else {
              
                    const userid=req.cookie.userToken;
                          connection.query( "SELECT * FROM followers WHERE Userid = ?",[userid],
                          function (error, results, fields) {
                      
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
                          
                                          }
                  });

          
  

}else{
  res.json({
      status:false,
      message:'not loged in'
  })
}}          