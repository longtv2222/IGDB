const { pool } = require('../db/cloudDatabase')



exports.getTeamEmployee = async (_req, res) => {
    const sql = "SELECT * FROM EMPLOYS NATURAL JOIN PLAYER;"

    try {
        const { rows } = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getTeamEmployeeWithTName = async (_req, res) => {
    const sql = "SELECT * FROM EMPLOYS NATURAL JOIN PLAYER WHERE TNAME = $1;"

    try {
        const { rows } = await pool.query(sql, [req.params.tname]);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postTeamEmploy = async (req, res) => {


    const sql = 'INSERT INTO EMPLOYS VALUES ($1, $2, $3, $4, $5);'
    const params = [req.params.tname, req.body.playername, req.body.year, req.body.month, req.body.day]
    try {
        await pool.query(sql, params);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteTeamEmploy = async (req, res) => {

    const params = [req.params.tname, req.body.playername]
    const sql = 'DELETE FROM EMPLOYS WHERE TNAME = $1 AND PLAYERNAME = $2'

    try {
        await pool.query(sql, params);
        res.json({ message: 'Deleted succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getTeam = async (req, res) => {
    const sql = "SELECT * FROM TEAM WHERE TNAME = ?;"
    const params = [req.params.tname]

    try {
        await pool.query(sql, params);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getAllTeam = async (_req, res) => {
    const sql = "SELECT * FROM TEAM;"
    try {
        await pool.query(sql);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postTeam = async (req, res) => {
    const sql = 'INSERT INTO TEAM VALUES ($1, $2, $3, $4, $5);'
    const params = [req.body.tname, req.body.description, req.body.year, req.body.month, req.body.day]
    try {
        await pool.query(sql);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteTeam = async (req, res) => {
    const sql = "DELETE FROM TEAM WHERE TNAME = $1;"
    const params = [req.params.tname]
    try {
        await pool.query(sql, params);
        res.json({ message: 'Deleted succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}