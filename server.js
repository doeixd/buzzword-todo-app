const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const app = express()
const bodyParser = require('body-parser')
const compression = require('compression');
var mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY'; 


const passport = require("passport");


var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test').catch(_=>{})

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var list = new Schema({
    name:  String,
    todos: [{ name: String, done: String }],
  });
  
  
  var user = new Schema({
    username: String,
    password: String,
    lists:[list]
  })
  
  var List = mongoose.model('List', list)
  var User = mongoose.model('User', user)

app.use(passport.initialize());
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
    
  User.findOne({ 'username':  jwt_payload.username }, 'username', function (err, person) {
    if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
  })
}));



function handleError(err){
  console.log(err)
  console.log('THIS IS AN ERRORORORORORORORORORO')
}

app.post('/login', (req, res) => {
  let { username, password } = req.body

  console.log(req.body)

  User.findOne({ 'username': username }, 'username password', function (err, person) {
    try{
      console.log(person)
      bcrypt.compare(password,person.password)
        .then(test => {
            console.log(test)
            if (test) {
              const secret = "SECRET_KEY"
              const token = jwt.sign({'username': username}, secret, {});
              return res.status(200).json({
                message: "Auth Passed",
                token
            })
            } else {
              console.log(test)
              return res.status(401).json({ message: "Auth Failed" })
            }
        } )
        .catch(err => {
          handleError(err)
        })       
      } 
    catch (err){
      console.log(err)
    }  
  });

});

app.post('/reg', (req, res) => {
  
  async function go () {
  let { username, password } = req.body


  let hash = await bcrypt.hash(password, 10)
  console.log(hash)

  let existingUser =  await User.findOne({ 'username': username }, 'username', function (err, person) {
        if (person) {
          console.log(person)
          res.send('username taken')
          return true
        } else {
          return false
        }
      }).catch((err) => {console.log(err)})
  
  console.log(existingUser)
      
  if (!existingUser) {
    console.log('creating user')
    User.create({
      'username' : username,
      'password' : hash,
      lists: [{'name':'TODO APP', 'todos':[{'name':'buy milk','done':'false'}]}]
    })
    console.log('user created')
    const secret = "SECRET_KEY"
    const token = jwt.sign({'username': username}, secret, {});
    res.status(200).json({
      message: "User Created",
      token
    })
  }
}
go()
});

app.get("/protected", passport.authenticate('jwt', { session: false }), function (req, res)  {
    return res.status(200).send("YAY! this is a protected Route")
})



});





// app.post('/saves', function (req, res) {
//   getUser(req.body.val, res)
//   console.log(req.body)
// })

// app.post('/load', function (req, res) {
//   saveUser(req.body, res)
// })

app.use(express.static(__dirname + '/dist'));
app.listen(80, () => console.log('Example app listening on port 80!'))

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'test';

// Use connect method to connect to the server
// var getUser = function (user, res) {
//   MongoClient.connect(url, function(err, client) {
//     assert.equal(null, err);
//     // console.log("Connected successfully to server");

//     const db = client.db(dbName);


//       // Get the documents collection
//       const collection = db.collection('users');
//       // Find some documents
//       collection.find({"name":user}).toArray(function(err, docs) {
//         assert.equal(err, null);
//         if (docs == []){
//           res.send('error')
//         } else {
//           console.log(docs)
//           res.send(docs)

//         }

//       });


//     client.close();
//   });
// }


// var saveUser = function (user, res) {
//   MongoClient.connect(url, function(err, client) {
//     assert.equal(null, err);
//     console.log(user)
//     const db = client.db(dbName);
//       const collection = db.collection('users');
//       // Find some documents
//       collection.find({"name":user.name}).toArray(function(err, docs) {
//         assert.equal(err, null);
//         if (docs.length == 0){
//           console.log('inserting doc')
//           db.collection('users').insertOne({...user}).catch((res)=>console.log(res))
//           res.send('ok')
//         } else {
//           res.send('error')
//         }

//       });


//   });
// }

