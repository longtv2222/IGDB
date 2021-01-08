const { pool } = require('../db/cloudDatabase')

exports.getOS = async (_req, res) => {
    const sql = "SELECT * FROM OPERATING_PLATFORM;"
    try {
        const { rows } = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getOSByID = async (req, res) => {
    const sql = "SELECT * FROM OPERATING_PLATFORM WHERE V_ID = $1;"
    const params = [req.params.v_id]
    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postOSByID = async (req, res) => {
    const sql = 'INSERT INTO OPERATING_PLATFORM VALUES ($1, $2);'
    const params = [req.params.v_id, req.body.platform]
    try {
        await pool.query(sql, params);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteOSByID = async (req, res) => {
    const sql = 'DELETE FROM OPERATING_PLATFORM WHERE V_ID = ? AND PLATFORM = ?';
    const params = [req.params.v_id, req.body.platform]

    try {
        await pool.query(sql, params);
        res.json({ message: 'Deleted succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getSimilarGame = async (req, res) => {
    const sql = "SELECT * FROM SIMILAR_TO WHERE V_ID = ?;"
    const params = [req.params.v_id]
    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postSimilarGame = async (req, res) => {
    const sql = 'INSERT INTO SIMILAR_TO VALUES($1, $2);'
    const params = [req.params.v_id, req.body.sim_id]

    try {
        await pool.query(sql, params);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getAllReviews = async (_req, res) => {
    const sql = "SELECT * FROM REVIEW NATURAL JOIN PAID_USER;"
    try {
        const { rows } = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getReviewsByUser = async (req, res) => {
    const sql = "SELECT * FROM REVIEW NATURAL JOIN PAID_USER WHERE V_ID = $1;"
    const params = [req.params.v_id];
    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postReviewByUser = async (req, res) => {
    const sql = 'INSERT INTO REVIEW VALUES ($1, $2, $3);'
    const params = [req.body.u_id, req.params.v_id, req.body.rating]
    try {
        await pool.query(sql, params);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteReviewByUser = async (req, res) => {

    const sql = 'DELETE FROM REVIEW WHERE V_ID = $1 AND U_ID = $2;';
    const params = [req.params.v_id, req.body.u_id];

    try {
        await pool.query(sql, params);
        res.json({ message: 'Deleted succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getCompetition = async (_req, res) => {
    const sql = "SELECT * FROM HAS;"
    try {
        const { rows } = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getCompetitionByGame = async (req, res) => {
    const sql = "SELECT * FROM HAS NATURAL JOIN ESPORT WHERE V_ID = ?;"
    const params = [req.params.v_id]

    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postCompetitionByGame = async (req, res) => {

    const sql = 'INSERT INTO HAS VALUES ($1, $2, $3);'
    const params = [req.params.v_id, req.body.league, req.body.genre]
    try {
        await pool.query(sql, params);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteCompetitionByGame = async (req, res) => {

    const sql = 'DELETE FROM HAS WHERE V_ID = $1 AND LEAGUE = $2';
    const params = [req.params.v_id, req.body.league];
    try {
        await pool.query(sql, params);
        res.json({ message: 'Deleted succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getAllGame = async (_req, res) => {
    const sql = "SELECT * FROM VIDEO_GAME;"
    try {
        const { rows } = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.getGame = async (req, res) => {
    const sql = "SELECT * FROM VIDEO_GAME WHERE V_ID = $1;"
    const params = [req.params.v_id]

    try {
        const { rows } = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        res.json(error.stack);
    }
}

exports.deleteGame = async (req, res) => {
    const sql = 'DELETE FROM VIDEO_GAME WHERE V_ID = $1';
    const params = req.params.v_id;
    try {
        await pool.query(sql, params);
        res.json({ message: 'Deleted succefully' })
    } catch (error) {
        res.json(error.stack);
    }
}

exports.postGame = async (req, res) => {


    const sql = 'INSERT INTO VIDEO_GAME(DESCRIPTION, VNAME, RELEASE_STATUS) VALUES($1, $2, $3);'
    const params = [req.body.description, req.body.vname, req.body.rs]

    try {
        await pool.query(sql, params);
        res.json({ message: 'Inserted succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}

exports.updateStatus = async (req, res) => {

    const sql = 'UPDATE VIDEO_GAME SET RELEASE_STATUS = $1 WHERE V_ID = $2;'
    const params = [req.body.rs, req.params.v_id]
    try {
        await pool.query(sql, params);
        res.json({ message: 'Updated succefully' });
    } catch (error) {
        res.json(error.stack);
    }
}
