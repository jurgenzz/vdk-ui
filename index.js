let connect = require("connect");
let http = require("http");
let bodyParser = require("body-parser");
let connectRouter = require("connect-route");
let serveStatic = require("serve-static");
let Storage = require("node-storage");
let axios = require("axios");
let fs = require('fs'); 
let config = {}

try {
  config = require('./config.json');
} catch(err) {
  //err
}

let app = connect();

app.use(bodyParser());
app.use(
  connectRouter(route => {
    route.post("/api/saveCmd", (req, res) => {
      let db = new Storage("../db");
      let commands = db.get("commands");

      if (commands) {
        commands = JSON.parse(commands);
      } else {
        commands = {};
      }

      commands[req.body.name] = req.body.value;

      db.put("commands", JSON.stringify(commands));
      res.end("ok");
    });

    route.get("/api/commands", (req, res) => {
      let db = new Storage("../db");
      let commands = db.get("commands");

      if (!commands) {
        commands = "{}";
      }
      res.end(JSON.stringify(commands));
    });

    route.get("/api/commands/delete/:id", (req, res) => {
      let db = new Storage("../db");
      let commands = db.get("commands");

      if (!commands) {
        commands = "{}";
      }
      commands = JSON.parse(commands);
      delete commands[req.params.id];

      db.put("commands", JSON.stringify(commands));
      res.end(JSON.stringify(commands));
    });

    route.get("/n", (req, res) => {
      let q = req.url;
      q = q.replace(/\/n\?q=+/, "");

      if (q) {
        res.writeHead(301, {
          Location:
            "http://www.pmlp.gov.lv/lv/sakums/statistika/personvardu-datu-baze/?id=137&query=" +
            q
        });
        res.end("redirect");
      } else {
        res.writeHead(301, { Location: "http://vd.jurg.is" });
        res.end("redirect");
      }
    });
   
    route.get("/auth", (req, res) => {
      res.writeHead(301, {
        Location:
          "https://accounts.spotify.com/authorize?response_type=code&client_id=be947c6cf75b4e5c9f043ca9d01d3548&scope=user-read-currently-playing&redirect_uri=http%3A%2F%2Fjurg.lv%2Fspotify&state=jurgenzz"
      });
    });
    route.get("/spotify", (req, res) => {
      let q = req.url;
      q = q.replace(/.+spotify\?code=+/, "").split("&");

      let code = q[0];
      let user = q[1] && q[1].replace("state=", "");
     
    axios({
        url: "https://accounts.spotify.com/api/token",
        method: "post",
        params: {
          grant_type: "authorization_code",
          code,
          state: user,
          redirect_uri: "http://vd.jurg.is/spotify",
          client_id: config.client_id,
          client_secret: config.client_secret
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(r => {
          let users = {};
          try {
            users = require("../tokens.json");
          } catch (err) {
            //
            users = {};
          }

          users[user] = {
            access_token: r.data.access_token,
            refresh_token: r.data.refresh_token
          };
          fs.writeFile("../tokens.json", JSON.stringify(users), err => {
            //
          });
          res.end("use !playing to see what you are playing :)");
        })
        .catch(err => {
          res.end("someone doesn't know how to write code. please try again.");
        });
    });
  })
);

app.use(serveStatic(__dirname + "/build")).listen(8080, function() {
  console.log("Server running on 8080...");
});
