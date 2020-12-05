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
    var sql = "SELECT * FROM player;"
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
/////////////////////THIS
app.get("/Player/:PlayerName/:asd", (req, res, next) => {
    var sql = "SELECT * FROM PLAYER WHERE PlayerName = ?;"
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

///THIS/////////////////////////////
app.post("/Player/", (req, res, next) => {
    var errors=[]
    if (!req.body.id){
        errors.push("No plocation key specified");
    }
    var data = {
        id : req.body.id
    }

    var sql ='INSERT INTO Player VALUES (?);'
    var params =[data.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "PlayerName" : this.lastID
        })
    });
})

////THIS//////////////
app.delete("/Player/:PlayerName", (req, res, next) => {
    db.run(
        'DELETE FROM CLIENT WHERE CNAME = ?',
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