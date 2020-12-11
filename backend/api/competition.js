const express = require('express')
const router = express.Router();
var db = require("../database.js")

//////////////////////////////Time_Table///////////////////////////
router.get("/Time_Table/", (req, res) => {
    var sql = "SELECT * FROM TIME_TABLE;"

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.get("/:cname/Time_Table/", (req, res) => {
    var sql = "SELECT * FROM TIME_TABLE WHERE CNAME = ?;"
    db.all(sql, req.params.cname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

router.delete("/:cname/Time_Table/", (req, res) => {
    db.run(
        'DELETE FROM TIME_TABLE WHERE CNAME = ?',
        req.params.cname,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

router.post("/:cname/Time_Table/", (req, res) => {
    var data = {
        cname: req.params.cname,
        time: req.body.time,
        league: req.body.league
    }

    var sql = 'INSERT INTO TIME_TABLE VALUES(?, ?, ?);'
    var params = [data.time, data.cname, data.league]
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
})

/******************************CLOCATION*********************************/
router.get("/clocation_table/", (req, res) => {
    var sql = "SELECT * FROM CLOCATION_TABLE;"

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.get("/:cname/clocation_table/", (req, res) => {
    var sql = "SELECT * FROM CLOCATION_TABLE WHERE CNAME = ? COLLATE NOCASE;"
    db.get(sql, req.params.cname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

router.post("/:cname/clocation_table/", (req, res) => {
    var data = {
        location: req.body.location,
        cname: req.params.cname,
        league: req.body.league
    }

    var sql = 'INSERT INTO CLOCATION_TABLE VALUES (?, ?, ?);'
    var params = [data.location, data.cname, data.league]
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
})

router.delete("/:cname/clocation_table/", (req, res, next) => {
    var data = {
        cname: req.params.cname,
        location: req.body.location
    }

    var params = [data.cname, data.location]
    db.run(
        'DELETE FROM CLOCATION_TABLE WHERE CNAME = ? AND LOCATION = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})
/////////////////////////Competition////////////////////

router.get("/:cname", (req, res) => {
    var sql = "SELECT * FROM COMPETITION WHERE CNAME = ?;"
    db.all(sql, req.params.cname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

router.get("/", (req, res) => {
    var sql = "SELECT * FROM COMPETITION;"
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.post("/", (req, res) => {

    var data = {
        cname: req.body.cname,
        description: req.body.description,
        league: req.body.league,
    }

    var sql = 'INSERT INTO COMPETITION VALUES (?, ?, ?);'
    var params = [data.cname, data.description, data.league]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
})

module.exports = router;
