const express = require('express')
const router = express.Router();
var db = require("../database.js")

/******************OPERATING PLATFORM ****************************/
router.get("/operating_platform", (req, res) => {
    var sql = "SELECT * FROM OPERATING_PLATFORM;"
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.get("/:v_id/operating_platform", (req, res) => {
    var sql = "SELECT * FROM OPERATING_PLATFORM WHERE V_ID = ?;"
    db.all(sql, req.params.v_id, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.post("/:v_id/operating_platform", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        platform: req.body.platform
    }

    var sql = 'INSERT INTO OPERATING_PLATFORM VALUES (?, ?);'
    var params = [data.v_id, data.platform]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
})

router.delete("/:v_id/operating_platform", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        platform: req.body.platform
    }

    var params = [data.v_id, data.platform]
    db.run(
        'DELETE FROM OPERATING_PLATFORM WHERE V_ID = ? AND PLATFORM = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

//**********************************************SIMILAR************************************************

router.get("/Similar_To/:v_id", (req, res) => {
    var sql = "SELECT * FROM SIMILAR_TO WHERE V_ID = ?;"
    db.get(sql, req.params.v_id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

router.post("/Similar_To/:v_id", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        sim_id: req.body.sim_id,
    }

    var sql = 'INSERT INTO SIMILAR_TO VALUES(?, ?);'
    var params = [data.v_id, data.sim_id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
})

/*****************************************Review**************** */
router.get("/Review", (req, res) => {
    var sql = "SELECT * FROM REVIEW NATURAL JOIN PAID_USER;"
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.get("/:v_id/Review", (req, res) => {
    var sql = "SELECT * FROM REVIEW NATURAL JOIN PAID_USER WHERE V_ID = ?;"

    db.all(sql, req.params.v_id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

router.post("/:v_id/Review", (req, res) => {
    var data = {
        U_ID: req.body.U_ID,
        v_id: req.params.v_id,
        Rating: req.body.Rating
    }

    var sql = 'INSERT INTO REVIEW VALUES (?, ?, ?);'
    var params = [data.U_ID, data.v_id, data.Rating]
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
})

router.delete("/:v_id/Review", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        u_id: req.body.u_id,
    }

    var params = [data.v_id, data.u_id];
    db.run(
        'DELETE FROM REVIEW WHERE V_ID = ? AND U_ID = ?;',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

/*****************************************HAS**************** */
router.get("/has", (req, res) => {
    var sql = "SELECT * FROM HAS;"
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.get("/:v_id/has", (req, res) => {
    var sql = "SELECT * FROM HAS NATURAL JOIN ESPORT WHERE V_ID = ?;"

    db.get(sql, req.params.v_id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

router.post("/:v_id/has", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        league: req.body.league,
        genre: req.body.genre
    }

    var sql = 'INSERT INTO HAS VALUES (?, ?, ?);'
    var params = [data.v_id, data.league, data.genre]
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
})

router.delete("/:v_id/has", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        league: req.body.league
    }
    var params = [data.v_id, data.league];
    db.run(
        'DELETE FROM HAS WHERE V_ID = ? AND LEAGUE = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

// /************ VIDEO_GAME **************** */
router.get("/", (req, res) => {
    var sql = "SELECT * FROM VIDEO_GAME;"
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
});

router.get("/:v_id", (req, res) => {
    var sql = "SELECT * FROM VIDEO_GAME WHERE V_ID = ?;"


    db.get(sql, req.params.v_id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

router.delete("/:v_id", (req, res) => {
    db.run(
        'DELETE FROM VIDEO_GAME WHERE V_ID = ?',
        req.params.v_id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

router.post("/", (req, res) => {
    var data = {
        description: req.body.description,
        vname: req.body.vname,
        rs: req.body.rs,
    }

    var sql = 'INSERT INTO VIDEO_GAME(DESCRIPTION, VNAME, RELEASE_STATUS) VALUES(?, ?, ?);'
    var params = [data.description, data.vname, data.rs]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
})




module.exports = router;