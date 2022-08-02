const express = require("express");
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors')


app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "Sgadepalli@070",
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

    [firstname, lastname, email, phone, password, reenterpassword], (err, result) => {

      if (err) {
        console.log(err);
      }

      else {
        res.send('values inserted')
      }
    })
})

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);

      } else {
        res.send({ message: "wrong email/password combination" });
      }
    })
});


app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO event_companies (comp_name, event_type, location, rating, minprice, email) VALUES (?,?,?,?,?,?)",
    [comp_name, event_type, location, rating, minprice, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.get("/event_companies", (req, res) => {
  db.query("SELECT * FROM event_companies", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/location", (req, res) => {
  const location = req.body.location;
  db.query("SELECT * FROM event_companies WHERE location =?", [location], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.listen(3001, () => { // should be different port
  console.log("running on port 3001");
});