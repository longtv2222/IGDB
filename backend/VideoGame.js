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

app.get("/Video_Game", (req, res, next) => {
    var sql = "SELECT * FROM VIDEO_GAME;"
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

app.get("/Video_Game/:V_ID", (req, res, next) => {
    var sql = "SELECT * FROM VIDEO_GAME WHERE V_ID = ?;"
   
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

app.post("/Video_Game/", (req, res, next) => {
    var errors=[]
    if (!req.body.id){
        errors.push("No V_ID specified");
    }
    var data = {
        vid : req.body.id,
		desc : req.body.desc,
		VName: req.body.VName,
		RD : req.body.RD,
    }

    var sql ='INSERT INTO VIDEO_GAME (V_ID, DESCRIPTION, VNAME, RELEASE_STATUS)VALUES (?, ?, ?, ?);'
    var params =[data.vid, data.desc, data.VName, data.RD]
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

app.delete("/Video_Game/:V_ID", (req, res, next) => {
    db.run(
        'DELETE FROM VIDEO_GAME WHERE V_ID = ?',
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