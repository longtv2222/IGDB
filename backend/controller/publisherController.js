const { pool } = require('../db/cloudDatabase')


exports.getLocation = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM PLOCATION_TABLE;');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.getLocationWithPName = async (req, res) => {
    const sql = "SELECT * FROM PLOCATION_TABLE WHERE PNAME = $1;"
    try {
        const { rows } = await pool.query(sql, [req.params.pname]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.postLocationWithPName = async (req, res) => {

    const sql = 'INSERT INTO plocation_table VALUES ($1, $2);'
    const params = [req.params.pname, req.body.location]

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Inserted succefully' });
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.deleteLocationWithPName = async (req, res) => {

    const sql = 'DELETE FROM PLOCATION_TABLE WHERE PNAME = $1 AND LOCATION = $2'
    const params = [req.params.pname, req.body.location]

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Deleted succefully' })
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.getAllPublishes = async (_req, res) => {
    const sql = "SELECT * FROM PUBLISHES NATURAL JOIN VIDEO_GAME;"
    try {
        const { rows } = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.getPublishes = async (req, res) => {
    const sql = "SELECT * FROM PUBLISHES NATURAL JOIN VIDEO_GAME WHERE PNAME = $1;"
    try {
        const { rows } = await pool.query(sql, req.params.pname);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.postPublishes = async (req, res) => {

    const sql = 'INSERT INTO PUBLISHES VALUES ($1, $2);'
    const params = [req.params.pname, req.body.v_id]

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Inserted succefully' });
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.deletePublishes = async (req, res) => {
    const params = [req.params.pname, req.body.v_id];
    const sql = 'DELETE FROM PUBLISHES WHERE PNAME = $1 AND V_ID = $2'

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Deleted succefully' })
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.getAllPublisher = async (_req, res) => {
    const sql = "SELECT * FROM PUBLISHER;"

    try {
        const { rows } = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }

}

exports.getPublisher = async (req, res) => {
    const sql = "SELECT * FROM PUBLISHER WHERE PNAME = $1;"
    try {
        const { rows } = await pool.query(sql, [req.params.pname]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.postPublisher = async (req, res) => {


    const sql = 'INSERT INTO PUBLISHER VALUES (?);'
    const params = [req.body.pname]

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Inserted succefully' });
    } catch (error) {
        res.status(500).json(error.stack);
    }

}

exports.deletePublisher = async (req, res) => {

    const sql = 'DELETE FROM PUBLISHER WHERE PNAME = ?'
    const params = [req.params.pname];


    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Deleted succefully' })
    } catch (error) {
        res.status(500).json(error.stack);
    }
}