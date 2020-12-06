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

/////////THIS NEEDS MULTIPLE VALUES IN THE ARGUMENT
app.get("/plocation_table/:PName", (req, res, next) => {
    var sql = "SELECT * FROM PLOCATION_TABLE WHERE PName = ?;"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
			"message":"success",
            "data":row
        })
      });
});




app.post("/plocation_table/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No pName key specified");
    }
    var data = {
		PName : req.body.name
        Location : req.body.Location,
    }

    var sql ='INSERT INTO plocation_table VALUES (?, ?);'
    var params =[data.PName, data.Location]
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

////THIS//////////////NEEDS TO TAKE MULTIPLE VALUES INTO ARGUMENT
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




//////////////////////////////////////////////////////////////////////////////////////////////////////////



app.get("/publisher", (req, res, next) => {
    var sql = "SELECT * FROM PUBLISHER;"
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


app.get("/publisher/:PName/", (req, res, next) => {
    var sql = "SELECT * FROM PUBLISHER WHERE PName = ?;"
 
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


app.post("/Publisher/", (req, res, next) => {
    var errors=[]
    if (!req.body.id){
        errors.push("No PName specified");
    }
    var data = {
        Pname : req.body.id
    }

    var sql ='INSERT INTO PUBLISHER VALUES (?);'
    var params =[data.PName]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "id" : this.lastID,
			"data" : data
        })
    });
})

app.delete("/Publish/:PName", (req, res, next) => {
    db.run(
        'DELETE FROM PUBLISHER WHERE PName = ?',
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