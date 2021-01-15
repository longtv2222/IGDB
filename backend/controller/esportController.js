const { pool } = require('../db/cloudDatabase')


exports.getAllEsport = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM ESPORT;');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.postAEsport = async (req, res) => {
    const sql = 'INSERT INTO ESPORT VALUES ($1);'
    try {
        await pool.query(sql, [req.body.league])
        res.status(200).json({ message: 'Insert succefully' });
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.deleteALeague = async (req, res) => {
    try {
        await pool.query('DELETE FROM ESPORT WHERE LEAGUE = $1;', [req.params.league]);
        res.status(200).json({ message: 'Delete succesfully' })
    } catch (error) {
        res.status(500).json(error.stack);
    }
}