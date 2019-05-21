const express = require('express');
const path = require('path');
var app = express();
app.use('/static', express.static(path.resolve(__dirname, '../build/static/')));
app.get('/', function getState(req,res,next){
  res.sendfile(path.resolve(__dirname, '../build/index.html'))
})

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});