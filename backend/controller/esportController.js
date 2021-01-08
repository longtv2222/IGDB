const { pool } = require('../db/cloudDatabase')


exports.getAllEsport = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM ESPORT;');
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postAEsport = async (req, res) => {
    const sql = 'INSERT INTO ESPORT VALUES ($1);'
    try {
        await pool.query(sql, [req.body.league])
        res.json({ message: 'Insert succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteALeague = async (req, res) => {
    try {
        await pool.query('DELETE FROM ESPORT WHERE LEAGUE = $1;', [req.params.league]);
        res.json({ message: 'Delete succesfully' })
    } catch (error) {
        res.json(error.stack);
    }
}