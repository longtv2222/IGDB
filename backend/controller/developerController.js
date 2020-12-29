var db = require("../db/database.js")

exports.getADeveloper = (req, res) => {
    var sql = "SELECT * FROM DEVELOPER WHERE DNAME = ?;"
    db.get(sql, req.params.dname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
}

exports.postADeveloper = (req, res) => {
    var errors = []
    if (!req.body.DName) {
        errors.push("No developer name is specified");
    }

    var sql = 'INSERT INTO DEVELOPER VALUES (?);'
    var data = req.body.DName
    db.run(sql, data, (err, result) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "DName": data
        })
    });
}

exports.getAllDeveloper = (req, res) => {
    var sql = "SELECT * FROM DEVELOPER;"
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
}

exports.deleteADeveloper = (req, res) => {
    db.run(
        'DELETE FROM DEVELOPER WHERE DName = ?;',
        req.params.dname,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

exports.getLocationWithDName = (req, res, next) => {
    var sql = "SELECT * FROM DLOCATION_TABLE WHERE DName = ?;"
    var params = [req.params.dname]
    db.all(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
}

exports.postLocationWithDName = (req, res, next) => {
    var errors = []
    if (!req.body.dname) {
        errors.push("No developer name is specified");
    }

    var sql = 'INSERT INTO DLOCATION_TABLE VALUES(?,?);'
    var data = {
        u_id: req.params.dname,
        location: req.body.location
    }

    var params = [data.u_id, data.location]
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            data
        })
    });
}

exports.deleteLocation = (req, res, next) => {
    var data = {
        dname: req.params.dname,
        location: req.params.location
    }

    var params = [data.dname, data.location]
    db.run(
        'DELETE FROM DLOCATION_TABLE WHERE DName = ? AND LOCATION = ?;',
        params,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

exports.getAllVideoGamesWithDName = (req, res) => { //All video games this developer develops
    var sql = "SELECT * FROM DEVELOPS AS D NATURAL JOIN VIDEO_GAME WHERE D.DNAME = ?;"
    var params = [req.params.dname]

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
}

exports.postADevelop = (req, res) => {
    var data = {
        v_id: req.body.v_id,
        dname: req.params.dname
    }

    var sql = 'INSERT INTO DEVELOPS VALUES (?,?);'
    var params = [data.v_id, data.dname]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "U_ID": data
        })
    });
}

exports.deleteADevelop = (req, res) => {
    var data = {
        v_id: req.body.v_id,
        dname: req.params.dname
    }
    var params = [data.v_id, data.dname]
    db.run(
        'DELETE FROM DEVELOPS WHERE V_ID = ? AND DNAME = ?',
        params,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}