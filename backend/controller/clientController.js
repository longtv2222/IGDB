const db = require("../db/database.js")
const jwt = require('jsonwebtoken')
const md5 = require("md5")


exports.paidUserLogin = (req, res) => {
    var data = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    var sql = "SELECT * FROM PAID_USER WHERE USER_NAME = ? AND PASSWORD = ?;"
    var params = [data.username, data.password]

    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).send("Login failed");
            return;
        }

        if (rows) {
            const token = jwt.sign({
                dat: data.username,
                id: rows.u_id
            }, 'NEKROZ OF BRIONAC',
                {
                    expiresIn: "2h"
                });

            res.json({
                message: "Login succesfully",
                the_token: token
            })
        } else {
            res.json("Login failed")
        }
    });
}

exports.paidUserSignUp = (req, res) => {
    var data = {
        username: req.body.username,
        password: md5(req.body.password) //md5 to hash the password
    }


    var sql = 'INSERT INTO PAID_USER(USER_NAME, PASSWORD) VALUES  (?, ?);'
    var params = [data.username, data.password]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success"
        })
    });
}

exports.getPaidUserByID = (req, res) => {
    var sql = "SELECT * FROM PAID_USER WHERE U_ID = ?;"

    db.get(sql, req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
}

exports.getAllPaidUser = (req, res) => {
    var sql = "SELECT * FROM PAID_USER;"
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

exports.deletePaidUserByID = (req, res) => {
    db.run(
        'DELETE FROM PAID_USER WHERE U_ID = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

exports.deletePaidUserByID = (req, res) => {
    db.run(
        'DELETE FROM PAID_USER WHERE U_ID = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

exports.updateUsername = (req, res) => {
    var data = {
        u_id: req.params.id,
        username: req.body.username,
    }

    var sql = 'UPDATE PAID_USER SET USER_NAME = ? WHERE U_ID = ?;'
    var params = [data.username, data.u_id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "Updated",
        })
    });
}

exports.getAllF2P = (req, res) => {
    var sql = "SELECT * FROM F2PClient;"
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

exports.deleteF2PByID = (req, res) => {
    db.run(
        'DELETE FROM F2PCLIENT WHERE U_ID = ?',
        req.params.u_id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

exports.insertF2PClient = (req, res) => {
    var sql = "INSERT INTO F2PCLIENT VALUES (?);"
    var params = [req.body.u_id]
    db.run(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": params
        })
    });
}

exports.getAllClient = (req, res) => {
    var sql = "SELECT * FROM CLIENT;"
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

exports.getClientByID = (req, res) => {
    var sql = "SELECT * FROM CLIENT WHERE U_ID = ?;"
    var params = [req.params.id]
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

exports.postClient = (req, res) => {
    var errors = []
    if (!req.body.id) {
        errors.push("No user id specified");
    }
    var data = {
        id: req.body.id
    }

    var sql = 'INSERT INTO CLIENT VALUES (?);'
    var params = [data.id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "U_ID": data
        })
    });
}

exports.deleteClient = (req, res) => {
    db.run(
        'DELETE FROM CLIENT WHERE U_ID = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}
