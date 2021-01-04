const db = require("../db/database.js")
const authentication = require('../middleware/authentication')
const md5 = require("md5")
const { pool } = require('../db/cloudDatabase')


exports.paidUserLogin = async (req, res) => {
    const sql = "SELECT * FROM PAID_USER WHERE USER_NAME = $1 AND PASSWORD = $2;"
    const params = [req.body.username, md5(req.body.password)]

    try {
        const result = await pool.query(sql, params)

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
    } catch (error) {
        res.json(error.stack);
    }
}



exports.paidUserSignUp = async (req, res) => {
    const sql = 'INSERT INTO PAID_USER(USER_NAME, PASSWORD) VALUES  ($1, $2) RETURNING user_name;'
    const params = [req.body.username, md5(req.body.password)]
    try {
        const { rows } = await pool.query(sql, params)
        res.json({ message: 'Signed up for account ' + rows[0].user_name + ' succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getPaidUserByID = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM PAID_USER WHERE U_ID = $1;', [req.params.id]);
        res.json({
            id: rows[0].u_id,
            username: rows[0].user_name
        });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getAllPaidUser = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT u_id, user_name FROM PAID_USER;');
        res.json({ rows });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deletePaidUserByID = async (req, res) => {
    try {
        await pool.query('DELETE FROM PAID_USER WHERE U_ID = $1;', [req.params.id]);
        res.json({ message: 'Deleted user with id: ' + req.params.id + 'succefully' });
    } catch (error) {
        res.json(error.stack);
    }
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










