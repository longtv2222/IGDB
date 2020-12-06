var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});



app.get("/Player", (req, res, next) => {
    var sql = "SELECT * FROM PLAYER;"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/Player/:PlayerName", (req, res, next) => {
    var sql = "SELECT * FROM PLAYER WHERE PLAYERNAME = ?;"
  
    db.get(sql, req.params.id, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "data":row
        })
      });
});


app.post("/Player/", (req, res, next) => {
    var errors=[]
    if (!req.body.id){
        errors.push("No PlayerName key specified");
    }
    var data = {
        PlayerName : req.body.id,
		age : req.body.age,
		natonality: req.body.nationality,
		description: req.body.description,
		p_player_flag: req.body.p_player_flag,
		org_less_flag: req.body.org_less_flag
    }

    var sql ='INSERT INTO PLAYER (PLAYERNAME, AGE, NATIONALITY, DESCRIPTION, P_PLAYER_FLAG, ORG_LESS_FLAG) VALUES (?, ?, ?, ?, ?, ?);'
    var params =[data.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "id" : this.lastID,
			"data": data
        })
    });
})


app.delete("/Player/:PlayerName", (req, res, next) => {
    db.run(
        'DELETE FROM PLAYER WHERE PLAYERNAME = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})

