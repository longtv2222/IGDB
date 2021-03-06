const { pool } = require('../db/cloudDatabase')

exports.getADeveloper = async (req, res) => {
    const sql = "SELECT * FROM DEVELOPER WHERE DNAME = $1;"
    try {
        const { rows } = await pool.query(sql, [req.params.dname]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.postADeveloper = async (req, res) => {
    const sql = 'INSERT INTO DEVELOPER VALUES ($1);'
    try {
        await pool.query(sql, [req.body.dname]);

        res.status(200).send({ message: 'Insert developer ' + req.body.dname + ' succefully.' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getAllDeveloper = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM DEVELOPER;');
        res.status(200).json(rows);
    } catch (error) {
        res.json(error.stack);
    }

}

exports.deleteADeveloper = async (req, res) => {
    try {
        await pool.query('DELETE FROM DEVELOPER WHERE DNAME = $1', [req.params.dname]);
        res.status(200).json('DELETED developer with name ' + req.params.dnmae);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getLocationWithDName = async (req, res) => {
    const sql = "SELECT * FROM DLOCATION_TABLE WHERE DName = $1;"
    try {
        const { rows } = await pool.query(sql, [req.params.dname]);
        res.status(200).json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postLocationWithDName = async (req, res) => {
    const sql = 'INSERT INTO DLOCATION_TABLE VALUES($1, $2);'
    const params = [req.params.dname, req.body.location]

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Insert succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteLocation = async (req, res) => {

    const sql = 'DELETE FROM DLOCATION_TABLE WHERE DNAME = $1 AND LOCATION = $2;'
    const params = [req.params.dname, req.params.location]

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Deleted succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getAllVideoGamesWithDName = async (req, res) => { //All video games this developer develops
    const sql = "SELECT * FROM DEVELOPS AS D NATURAL JOIN VIDEO_GAME WHERE D.DNAME = $1;"
    const params = [req.params.dname]
    try {
        const { rows } = await pool.query(sql, params);
        res.status(200).json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postADevelop = async (req, res) => {
    const sql = 'INSERT INTO DEVELOPS VALUES ($1, $2);'
    const params = [req.body.v_id, req.params.dname]

    try {
        await pool.query(sql, params);
        res.status(200).json('INSERTED SUCCEFULLY');
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteADevelop = async (req, res) => {
    const params = [req.params.v_id, , req.params.dname]
    const sql = 'DELETE FROM DEVELOPS WHERE V_ID = $1 AND DNAME = $2;'
    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'DELETED SUCCEFULLY' })
    } catch (error) {
        res.json(error.stack);
    }
}