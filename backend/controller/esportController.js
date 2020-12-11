var db = require("../database.js")

exports.getAllEsport = (req, res) => {
    var sql = "SELECT * FROM ESPORT;"
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

exports.postAEsport = (req, res) => {
    var sql = 'INSERT INTO ESPORT VALUES (?);'
    var league = req.body.league
    db.run(sql, league, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": league
        })
    });
}

exports.deleteALeague = (req, res) => {
    db.run(
        'DELETE FROM ESPORT WHERE league = ?',
        req.params.league,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}