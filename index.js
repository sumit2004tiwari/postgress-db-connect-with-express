const pg = require('pg');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


///////// router.param(req , res , next , id)

app.get('/user/:sumit' , (req , res)=>{
  const username = req.param.user
      res.send(`this is my user name :: ${username}`)
})

////// middeleware 

function authentication(req , res , next){
  
      if(!req.userauthenticate){
        res.send("  no user found")
      }
      next()
}

app.all('/authenticate/*' , authentication)


///// cookie parser 

app.get('/cookie' , (req , res) =>{
    const userId = 12323;
    res.cookie('userid' , userId)
    res.send("cookie sent successfully")
})

///// request of param from url
app.get('/name/:sumit/:age' , (req , res , next)=>{
     const fullname = req.params.sumit
     const age = req.params.age
     res.send(`this is your name ${fullname} and the age is ${age}`)
})

//// request.secure checking 

app.get('/secure' , (req , res)=>{
     console.log(!req.secure)
    //  res.redirect("https://nekasu.com")
     res.json({name:"sumit" , class : "aman" , age : 32})
     
})

///// xhr data 

app.get('/xhr' , (req , res)=>{
  if(req.xhr){
    res.json({message : 'this is a message if xhr will true'})
  }else{
    res.send('this is a normal data ')
  }
})

//// request to know the on which host application run (req.hostname , req.headers , req.ip)

app.get('/host' , (req , res , next)=>{
  console.log(req.hostname , req.headers , req.ip ,  "host id")
  res.send("your host id is successfully console in your log")
})

 //// router are start here (req.baseUrl , req.orginalUrl)
const greet = express.Router();

app.use('/greet' , greet)

greet.get('/' , (req , res) => {
  console.log(req.baseUrl)
    res.send(" i am on home page")
})

greet.get('/insta' , (req , res) =>{
 console.log(req.baseUrl)
 console.log(req.originalUrl)
 res.send(" i am on insta page")
})

greet.get('/fb'  ,(req , res)=>{
 console.log(req.baseUrl)
 console.log(req)
 res.send(" i am on facebook page")
})
//////   here req.baseurl router ends




const pool = new pg.Pool({
  user : 'postgres',
  host : 'localhost',
  database : "Testing",
  password : "sumit@123",
  port : 5432,
});

pool.connect((err) =>{
  if(err){
    console.error(err.stack , "connection error")
  }else{
    console.log(" successfull happen " )
  }
})

app.post('/submit-form', async (req, res) => {
  
  const { firstname, lastname ,  email , password , phonenumber } = req.body;

  try {
    const query = 'INSERT INTO userDetail (firstname, lastname ,  email , password , phonenumber) VALUES ($1, $2 , $3 , $4 , $5)';
    await pool.query(query, [firstname, lastname ,  email , password , phonenumber]);

    res.status(200).json({ message: 'User data saved successfully!' });
  } catch (error) {
    console.error('Error saving user data', error.stack);
    res.status(500).json({ message: 'Failed to save user data' });
  }
});



// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000 >>>>");
});
