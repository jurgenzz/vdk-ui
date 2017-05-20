let connect = require('connect');
let http = require('http');
let bodyParser = require('body-parser');
let connectRouter = require('connect-route');
let serveStatic = require('serve-static');
var Storage = require('node-storage');

let app = connect();

app.use(bodyParser());
app.use(connectRouter(route => {
  route.post('/api/saveCmd', (req, res) => {
    let db = new Storage('../db');
    let commands = db.get('commands');
    
    if (commands) {
      commands = JSON.parse(commands);
    } else {
      commands = {};
    }
    
    commands[req.body.name] = req.body.value;
    
    db.put('commands', JSON.stringify(commands));
    res.end('ok');
  })
  
  route.get('/api/commands', (req, res) => {
    let db = new Storage('../db');
    let commands = db.get('commands');
    
    if (!commands) {
      commands = "{}"
    }
    res.end(JSON.stringify(commands))
  })
  
  route.get('/api/commands/delete/:id', (req, res) => {
    let db = new Storage('../db');
    let commands = db.get('commands');
    
    if (!commands) {
      commands = "{}"
    }
    commands = JSON.parse(commands);
    delete commands[req.params.id];
    
    db.put('commands', JSON.stringify(commands));
    res.end(JSON.stringify(commands));
  })
}))


app.use(serveStatic(__dirname + '/build')).listen(8080, function(){
  console.log('Server running on 8080...');
});
