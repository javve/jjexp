#require.paths.unshift('.') # my dir is in path

m = require 'mongoose'
m.connect 'mongodb://localhost/jjex'

express = require 'express'
haml = require 'hamljs'

RegExp = m.model 'RegExp', new m.Schema
  pattern: String
  test_string: String

app = express.createServer()

app.register '.haml', haml
app.use express.bodyParser()

app.get '/', (req, res) ->

  re = /\((\d{0,3})\)/i
  str = "(0) produkter"
  assertion = "0"

  test = str.match re

  res.render 'index.haml'
  #res.send test

app.post '/regexps', (req, res) ->
  regexp = new RegExp
    pattern: req.body.pattern
    test_string: req.body.test_string

  res.redirect "/regexps/#{regexp.id}"

app.get '/regexps/:id', (req, res) ->
  regexp = RegExp.findById req.params.id, (err, docs) ->
    if err
      res.json {message: 'errorz'}
    else
      res.json docs


app.listen 3002
