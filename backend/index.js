const express = require("express");
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors')


app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "Sharat1loveyou!",
  database: "project157a",


});

app.post('/signup', (req, res) => {

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const reenterpassword = req.body.reenterpassword;

  db.query('INSERT INTO users (firstname,lastname,email,phone,password,reenterpassword) VALUES (?,?,?,?,?,?)',

  [firstname,lastname,email,phone,password,reenterpassword], (err, result) =>{
    
    if (err)
    {
      console.log(err)
    }
    else{
      res.send('values inserted')
    }})
})

app.post('/login', (req, res) => {
  const email =req.body.email;
  const password =req.body.password;
  
  db.query('SELECT * FROM users WHERE email = ? AND password = ?',
  [email,password],
  (err, result) =>{
    if (err)
    {
      res.send({err: err});
    }

    if(result.length > 0){
      res.send(result);
    } else {
      res.send({message: "wrong email/password combination"});
    } })
});

app.listen(3001, () => { // should be different port
  console.log("running on port 3001");
});