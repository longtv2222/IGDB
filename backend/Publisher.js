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



app.get("/plocation_table", (req, res, next) => {
    var sql = "SELECT * FROM plocation_table;"
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
app.get("/plocation_table/:PName", (req, res, next) => {
    var sql = "SELECT * FROM CLIENT WHERE U_ID = ?;"
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



///THIS/////////////////////////////NEEDS HELP
app.post("/plocation_table/:CName/:Location", (req, res, next) => {
    var errors=[]
    if (!req.body.id){
        errors.push("No plocation key specified");
    }
    var data = {
        id : req.body.id
    }

    var sql ='INSERT INTO plocation_table VALUES (?, ?);'
    var params =[data.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "CName" : this.lastID
			/////NEED TO ONE MORE ADD HERE FOR LOCATION
        })
    });
})

////THIS//////////////
app.delete("/plocation_table/:CName/:Location", (req, res, next) => {
    db.run(
        'DELETE FROM plocation_table WHERE CNAME = ? AND Location = ?',
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





app.get("/publisher", (req, res, next) => {
    var sql = "SELECT * FROM publisher;"
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


app.get("/publisher/:PName/:asd", (req, res, next) => {
    var sql = "SELECT * FROM CLIENT WHERE PName = ?;"
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

//THIS/////////////////
app.post("/Publisher/", (req, res, next) => {
    var errors=[]
    if (!req.body.id){
        errors.push("No user id specified");
    }
    var data = {
        id : req.body.id
    }

    var sql ='INSERT INTO CLIENT VALUES (?);'
    var params =[data.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "U_ID" : this.lastID
        })
    });
})

//THIS//////////////////////////////
app.delete("/Publish/:PName", (req, res, next) => {
    db.run(
        'DELETE FROM CLIENT WHERE PName = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})
// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});