const { pool } = require('../db/cloudDatabase')

exports.getPlayerParticipate = async (req, res) => {
    const sql = "SELECT * FROM PLAYER NATURAL JOIN PARTICIPATE WHERE PLAYERNAME = $1;"
    try {
        const { rows } = await pool.query(sql, req.params.playername);
        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.deletePlayerParticipate = async (req, res) => {


    const params = [req.params.playername, req.params.competitionname]
    const sql = 'DELETE FROM PARTICIPATE WHERE PLAYERNAME = $1 AND CNAME = $2;'

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Deleted succefully' });
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.postParticipate = async (req, res) => {
    const sql = 'INSERT INTO PARTICIPATE VALUES($1, $2, $3);'
    const params = [req.body.cname, req.params.playername, req.body.league]

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Inserted succefully' });
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.getAllPlayer = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM PLAYER');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.getPlayer = async (req, res) => {
    const sql = "SELECT * FROM PLAYER WHERE PLAYERNAME = $1;"

    try {
        const { rows } = await pool.query(sql, [req.params.playername])
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.deletePlayer = async (req, res) => {
    const sql = "DELETE FROM PLAYER WHERE PLAYERNAME = $1;"

    try {
        await pool.query(sql, [req.params.playername])
        res.status(200).json({ message: 'Deleted succefully' });
    } catch (error) {
        res.status(500).json(error.stack);
    }
}

exports.postPlayer = async (req, res) => {
    const sql = 'INSERT INTO PLAYER VALUES($1, $2, $3, $4, $5, $6);'
    const params = [req.body.playername, req.body.age, req.body.nationality, req.body.description, req.body.player_flag, req.body.org_less_flag]

    try {
        await pool.query(sql, params);
        res.status(200).json({ message: 'Inserted succefully' });
    } catch (error) {
        res.status(500).json(error.stack);
    }
}