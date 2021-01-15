const { pool } = require('../db/cloudDatabase')

exports.getAllTimeTable = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM TIME_TABLE');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }

}

exports.getCNameTimeTable = async (req, res) => {
    try {
        const sql = "SELECT * FROM TIME_TABLE WHERE CNAME = $1;"
        const { rows } = await pool.query(sql, [req.params.cname]);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteTimeTable = async (req, res) => {
    try {
        const params = [req.params.cname];
        await pool.query('DELETE FROM TIME_TABLE WHERE CNAME = $1', params);
        res.json({ message: 'DELETE cname ' + params[0] + ' succesfully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postTimeTable = async (req, res) => {
    const sql = 'INSERT INTO TIME_TABLE VALUES($1, $2, $3);'
    const params = [req.params.cname, req.body.time, req.body.league]

    try {
        await pool.query(sql, params);
        res.json({ message: 'Inserted succefully' })
    } catch (error) {
        res.json(error.stack)
    }
}

exports.getAllLocation = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM CLOCATION_TABLE');
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getAllLocationWithCName = async (req, res) => {
    try {
        const sql = "SELECT * FROM CLOCATION_TABLE WHERE CNAME = $1;"
        const { rows } = await pool.query(sql, [req.params.cname]);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postLocationWithCName = async (req, res) => {
    const sql = 'INSERT INTO CLOCATION_TABLE VALUES ($1, $2, $3);'
    const params = [req.body.location, req.params.cname, req.body.league]

    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteLocationWithCName = async (req, res) => {

    const sql = 'DELETE FROM CLOCATION_TABLE WHERE CNAME = $1 AND LOCATION = $2 AND LEAGUE = $3;'
    const params = [req.params.cname, req.body.location, req.body.league]

    try {
        await pool.query(sql, params);
        res.json({ message: 'Delete ' + params[1] + ' in competition ' + params[0] + ' succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getCName = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM COMPETITION WHERE CNAME = $1;', req.params.cname);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }

}

exports.getAllCname = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM COMPETITION;');
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postCName = async (req, res) => {
    const sql = 'INSERT INTO COMPETITION VALUES ($1, $2, $3);'
    const params = [req.body.cname, req.body.description, req.body.league]

    try {
        await pool.query(sql, params);
        res.json({ message: 'Insert competition ' + params[0] + ' succefully' })
    } catch (error) {
        res.json(error.stack)
    }
}