var db = require("../database.js")

exports.getPlayerParticipate = (req, res) => {
    var sql = "SELECT * FROM PLAYER NATURAL JOIN PARTICIPATE WHERE PLAYERNAME = ?;"
    db.all(sql, req.params.playername, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
}

exports.deletePlayerParticipate = (req, res) => {
    var data = {
        playername: req.params.playername,
        competitionname: req.params.competitionname
    }

    var params = [data.playername, data.competitionname]
    db.run(
        'DELETE FROM PARTICIPATE WHERE PLAYERNAME = ? AND CNAME = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

exports.postParticipate = (req, res) => {
    var sql = 'INSERT INTO PARTICIPATE VALUES(?, ?, ?);'
    var data = {
        cname: req.body.cname,
        playername: req.params.playername,
        league: req.body.league
    }

    var params = [data.cname, data.playername, data.league]
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
}

exports.getAllPlayer = (req, res) => {
    var sql = "SELECT * FROM PLAYER;"
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
}

exports.getPlayer = (req, res) => {
    var sql = "SELECT * FROM PLAYER WHERE PLAYERNAME = ?;"
    db.all(sql, req.params.playername, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
}

exports.deletePlayer = (req, res) => {
    var sql = "DELETE FROM PLAYER WHERE PLAYERNAME = ?;"
    db.run(sql, req.params.playername, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", rows: this.changes })
    });
}

exports.postPlayer = (req, res) => {
    var sql = 'INSERT INTO PLAYER VALUES(?, ?, ?, ?, ?, ?);'
    var data = {
        playername: req.body.playername,
        age: req.body.age,
        nationality: req.body.nationality,
        description: req.body.description,
        player_flag: req.body.playerflag,
        org_less_flag: req.body.orglessflag
    }

    var params = [data.playername, data.age, data.nationality, data.description, data.player_flag, data.org_less_flag]
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
}