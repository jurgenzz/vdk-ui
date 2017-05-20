let connect = require('connect');
let http = require('http');
let bodyParser = require('body-parser');
let connectRouter = require('connect-route');
let serveStatic = require('serve-static');
let levelup = require('levelup')
let db = levelup('./db')


let app = connect();

app.use(bodyParser());
app.use(connectRouter(route => {
  route.post('/api/saveCmd', (req, res) => {
    db.get('commands', (err, commands) => {
      if (commands) {
        commands = JSON.parse(commands);
      }
      if (err) {
        commands = {};
      }
      
      commands[req.body.name] = req.body.value;
      
      db.put('commands', JSON.stringify(commands), err => {
        console.log(err)
      })
    })
  })
  
  route.get('/api/commands', (req, res) => {
    db.get('commands', (err, commands) => {
      if (err) {
        commands = {};
      }
      res.end(JSON.stringify(commands))
    })
  })
}))


app.use(serveStatic(__dirname + '/build')).listen(8080, function(){
  console.log('Server running on 8080...');
});
