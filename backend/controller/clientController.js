const db = require("../db/database.js")
const authentication = require('../middleware/authentication')
const md5 = require("md5")
const { pool } = require('../db/cloudDatabase')


exports.paidUserLogin = (req, res) => {
    const sql = "SELECT * FROM PAID_USER WHERE USER_NAME = $1 AND PASSWORD = $2;"
    const params = [req.body.username, md5(req.body.password)]

    pool
        .query(sql, params)
        .then(result => {
            if (result.rows.length) {   //Check if any row exists

                const token = authentication.jwtSignIn(result.rows[0].user_name, result.rows[0].u_id)

                res.json({
                    message: 'Login succesfully',
                    token: token
                })
            } else {
                res.json({
                    message: 'Login failed'
                })
            }
        })
        .catch(err => err.stack)
}



exports.paidUserSignUp = async (req, res) => {
    const sql = 'INSERT INTO PAID_USER(u_id,USER_NAME, PASSWORD) VALUES  (1,$1, $2);'
    const params = [req.body.username, md5(req.body.password)]
    pool.query(sql, params).then(
        res.json('Signed up paid user ' + params[0] + ' succesfully')
    ).catch(res.send('Signed up failed'))
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










