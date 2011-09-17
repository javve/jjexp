#require.paths.unshift('.') # my dir is in path

m = require 'mongoose'
m.connect 'mongodb://localhost/jjex'

express = require 'express'
haml = require 'hamljs'

# TODO: validation
RegExp = m.model 'RegExp', new m.Schema
  pattern: String
  test_string: String
  email: String
  title: String

app = express.createServer()

app.register '.haml', haml
app.use express.bodyParser()
app.use express.static (__dirname + '/public')

app.get '/', (req, res) ->

  re = /\((\d{0,3})\)/i
  str = "(0) produkter"
  assertion = "0"

  test = str.match re

  regexps = RegExp.find {}, (err, docs) ->
    if err
      res.json 
        message: 'errorz'
    else
      res.render 'index.haml', 
        docs: docs

app.post '/regexps', (req, res) ->
  regexp = new RegExp
    pattern: req.body.pattern
    test_string: req.body.test_string
    title: req.body.title
  
  error = false # poor mans error handling :)
  regexp.save (err) ->
    if err
      res.json {message: 'errorz'}
    else
      res.json regexp

app.get '/regexps/:id', (req, res) ->
  regexp = RegExp.findById req.params.id, (err, docs) ->
    if err
      res.json {message: 'errorz'}
    else
      res.json docs

app.listen 3002
