const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
const compression = require('compression')
var mongoose = require('mongoose')
const JwtStrategy = require('passport-jwt').Strategy
const opts = {}
opts.jwtFromRequest = req => (req.cookies.jwt)
opts.secretOrKey = 'SECRET_KEY' 


const passport = require('passport')


var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test').catch(_=>{})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  var list = new Schema({
    name:  String,
    todos: [{ name: String, done: String }],
  })
  
  
  var user = new Schema({
    username: String,
    password: String,
    lists:[list]
  })
  
  var User = mongoose.model('User', user)

  app.use(passport.initialize())
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())




  // app.use(function (req, res) {
  //   res.setHeader('Content-Type', 'text/plain')
  //   res.write('you posted:\n')
  //   res.end(JSON.stringify(req.body, null, 2))
  // })

  passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
    
    User.findOne({ 'username':  jwt_payload.username }, 'username', function (err) {
      console.log(jwt_payload)  
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))



  function handleError(err){
    console.log(err)
    console.log('THIS IS AN ERRORORORORORORORORORO')
  }

  app.post('/login', (req, res) => {
    let { username, password } = req.body
    console.log(`THIS IS ${username} and ${password}`)
        
    User.findOne({ 'username': username }, 'username password', function (err, person) {
      try{
        if (person)  {
          console.log(person)
          bcrypt.compare(password,person.password)
            .then(test => {
              console.log(test)
              if (test) {
                const secret = 'SECRET_KEY'
                const token = jwt.sign({'username': username}, secret, {})
                res.cookie('jwt', token, { httpOnly: true, secure: true })
                return res.status(200).json({
                  message: 'Auth Passed',
                  token,
                  username
                })
              } else {
                console.log(test)
                return res.status(401).json({ message: 'Auth Failed' })
              }
            } )
            .catch(err => {
              handleError(err)
            })  
        } else {return res.status(401).json({ message: 'Auth Failed' })}
      } 
      catch (err){
        console.log(err)
      }  
    })

  })


  app.post('/todos', (req, res) => {
    
    try {
      let username = jwt.decode(req.cookies.jwt).username
      console.log(username)
      User.findOne({ 'username': username }, 'username lists', function (err, person) {
        if (person.lists) {
          return res.status(200).json({
            message: 'OK',
            lists: person.lists
          })
        } else {
          return res.status(422).json({
            message: 'ERROR'
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  })


  app.post('/delete', (req, res) => {

    try {
      let username = jwt.decode(req.cookies.jwt).username
      User.findOne({ 'username': username }, 'username lists', function (err, person) {
        if (person.lists) {
          person.lists.splice(req.body.list,1)
          person.lists ? person.lists = [{name: 'TODO APP', todos:[{name:'buy milk',done:"false"}]}] : null
          person.save((err, updatedPerson) => {
            if (err) return handleError(err)
            return res.status(200).json({
              message: 'OK',
              lists: person.lists
            })
          })
        } else {
          return res.status(422).json({
            message: 'ERROR'
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  })


  app.post('/update', (req, res) => {

    try {
      let username = jwt.decode(req.cookies.jwt).username
      User.findOne({ 'username': username }, 'username lists', function (err, person) {
        if (person.lists) {

          person.lists = req.body.lists

          person.save((err, updatedPerson) => {
            if (err) return handleError(err)
            return res.status(200).json({
              message: 'OK',
              lists: person.lists
            })
          })
        } else {
          return res.status(422).json({
            message: 'ERROR'
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  })


  app.post('/newlist', (req, res) => {
    let username = jwt.decode(req.cookies.jwt).username
    console.log(username)
    try {
      User.findOne({ 'username': username }, 'username lists', function (err, person) {
        if (person.lists) {
          person.lists = [...person.lists, ...req.body.added]

          person.save((err, updatedPerson) => {
            if (err) return handleError(err)
            return res.status(200).json({
              message: 'OK',
              lists: person.lists
            })
          })
        } else {
          return res.status(422).json({
            message: 'ERROR'
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  })

  app.post('/register', (req, res) => {
  
    async function go () {
      let { username, password } = req.body


      let hash = await bcrypt.hash(password, 10)
      console.log(hash)

      let existingUser =  await User.findOne({ 'username': username }, 'username', function (err, person) {
        if (person) {
          console.log(person)
          res.status(406).json({ message: 'TAKEN' })
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
        const secret = 'SECRET_KEY'
        const token = jwt.sign({'username': username}, secret, {})
        res.status(200).json({
          message: 'User Created',
          token
        })
      }
    }
    go()
  })
    
    
  /* final catch-all route to index.html defined last */
    
  app.get('/login',express.static(__dirname + '/dist') ,(req, res) => {
    res.sendFile(__dirname, + '/dist/index.html')
  })
    
  // app.get('/profile', passport.authenticate('jwt', { session: false }), function (req, res)  {  
  //   return res.status(200).send('YAY! this is a protected Route')
  // })

  app.get('/profile', express.static(__dirname + '/dist'), (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
  })
    
  
  app.get('/*', express.static(__dirname + '/dist'), (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
  })
    
    
  app.listen(80, () => console.log('Example app listening on port 80!'))



})