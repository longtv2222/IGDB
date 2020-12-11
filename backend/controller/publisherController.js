var db = require("../database.js")

exports.getLocation = (req, res) => {
    var sql = "SELECT * FROM PLOCATION_TABLE;"
    var params = []
    db.all(sql, params, (err, rows) => {
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

exports.getLocationWithPName = (req, res) => {
    var sql = "SELECT * FROM PLOCATION_TABLE WHERE PNAME = ? COLLATE NOCASE;"
    db.get(sql, req.params.pname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
}

exports.postLocationWithPName = (req, res) => {
    var data = {
        pname: req.params.pname,
        location: req.body.location
    }

    var sql = 'INSERT INTO plocation_table VALUES (?, ?);'
    var params = [data.pname, data.location]
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
}

exports.deleteLocationWithPName = (req, res, next) => {
    var data = {
        pname: req.params.pname,
        location: req.body.location
    }

    var params = [data.pname, data.location]
    db.run(
        'DELETE FROM PLOCATION_TABLE WHERE PNAME = ? AND LOCATION = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

exports.getAllPublishes = (req, res) => {
    var sql = "SELECT * FROM PUBLISHES NATURAL JOIN VIDEO_GAME;"
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

exports.getPublishes = (req, res) => {
    var sql = "SELECT * FROM PUBLISHES NATURAL JOIN VIDEO_GAME WHERE PNAME = ?;"

    db.get(sql, req.params.pname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
}

exports.postPublishes = (req, res) => {
    var data = {
        pname: req.params.pname,
        v_id: req.body.v_id
    }

    var sql = 'INSERT INTO PUBLISHES VALUES (?, ?);'
    var params = [data.pname, data.v_id]
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
}

exports.deletePublishes = (req, res) => {
    var data = {
        pname: req.params.pname,
        v_id: req.body.v_id
    }
    var params = [data.pname, data.v_id];
    db.run(
        'DELETE FROM PUBLISHES WHERE PNAME = ? AND V_ID = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

exports.getAllPublisher = (req, res) => {
    var sql = "SELECT * FROM PUBLISHER;"
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

exports.getPublisher = (req, res) => {
    var sql = "SELECT * FROM PUBLISHER WHERE PNAME = ?;"

    db.get(sql, req.params.pname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
}

exports.postPublisher = (req, res) => {
    var errors = []
    if (!req.body.id) {
        errors.push("No PName specified");
    }
    var data = {
        pname: req.body.pname
    }

    var sql = 'INSERT INTO PUBLISHER VALUES (?);'
    var params = [data.pname]
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

exports.deletePublisher = (req, res, next) => {
    db.run(
        'DELETE FROM PUBLISHER WHERE PNAME = ?',
        req.params.pname,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}