const express = require('express')
const router = express.Router();
var db = require("../database.js")

/*****************************************EMPLOYS**************** */
router.get("/employs", (req, res) => {
    var sql = "SELECT * FROM EMPLOYS NATURAL JOIN PLAYER;"
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

router.get("/:TName/employs", (req, res) => {
    var sql = "SELECT * FROM EMPLOYS NATURAL JOIN PLAYER WHERE TNAME = ?;"

    db.get(sql, req.params.TName, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

router.post("/:TName/employs", (req, res) => {
    var data = {
        TName: req.params.TName,
        PlayerName: req.body.PlayerName,
        Year: req.body.Year,
        Month: req.body.Month,
        Day: req.body.Day
    }

    var sql = 'INSERT INTO EMPLOYS VALUES (?, ?, ?, ?, ?);'
    var params = [data.TName, data.PlayerName, data.Year, data.Month, data.Day]
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

router.delete("/:TName/employs", (req, res) => {
    var data = {
        TName: req.params.TName,
        PlayerName: req.body.PlayerName,
    }
    var params = [data.TName, data.PlayerName];
    db.run(
        'DELETE FROM EMPLOYS WHERE TNAME = ? AND PLAYERNAME = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

////////////////////TEAM///////////////////////
router.get("/:tname", (req, res) => {
    var sql = "SELECT * FROM TEAM WHERE TNAME = ?;"
    db.all(sql, req.params.tname, (err, row) => {
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
    var sql = "SELECT * FROM TEAM;"
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
        tname: req.body.tname,
        description: req.body.description,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
    }

    var sql = 'INSERT INTO TEAM VALUES (?, ?, ?, ?, ?);'
    var params = [data.tname, data.description, data.year, data.month, data.day]
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

router.delete("/:tname", (req, res) => {
    var data = {
        tname: req.params.tname,
    }
    var sql = "DELETE FROM TEAM WHERE TNAME = ?;"
    var params = [data.tname, data.league]
    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", rows: this.changes })
    });
});


module.exports = router;
