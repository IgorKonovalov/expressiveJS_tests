// локальный сервер, требует установленного express


let app = require('express')();
let http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile('autocomplete.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
