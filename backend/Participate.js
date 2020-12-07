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



app.get("/Competition/Participate", (req, res, next) => {
    var sql = "SELECT * FROM PARTICIPATE;"
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
/////////////////////THIS NEEDS REVIEW
app.get("/Participate/:CName/:PlayerName/:League", (req, res, next) => {
    var sql = "SELECT * FROM PARTICIPATE WHERE CNAME = ? AND PLAYERNAME = ? AND LEAGUE = ?;"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "data":row
        })
      });
});

///THIS/////////////////////////////NEEDS REVIEW
app.post("/Participate/", (req, res, next) => {
    var errors=[]
    if (!req.body.id){
        errors.push("No CName key specified");
    }
    var data = {
        CName : req.body.id
		PlayerName : req.body.PlayerName
		League : req.body.League
    }

    var sql ='INSERT INTO PARTICIPATE(CNAME, PLAYERNAME, LEAGUE) VALUES (?, ?, ?);'
    var params =[data.CName, data.PlayerName, data.League]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
             "id" : this.lastID
			 "data" : data
        })
    });
})

////THIS//////////////NEEDS REVIEW
app.delete("/Participate/:CName/:PlayerName/:League", (req, res, next) => {
    db.run(
        'DELETE FROM PARTICIPATE WHERE CNAME = ? AND PLAYERNAME = ? AND LEAGUE = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})




///////////////////////////////////////////////////////////


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});