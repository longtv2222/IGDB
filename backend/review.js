

/*****************************************Review**************** */
app.get("/Video_Game/Review", (req, res) => {
    var sql = "SELECT * FROM REVIEW NATURAL JOIN CLIENT;"
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

app.get("/Video_Game/:v_id/Review", (req, res) => {
    var sql = "SELECT * FROM REVIEW NATURAL JOIN CLIENT WHERE V_ID = ?;"

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

app.post("/Video_Game/:v_id/Review", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        U_ID : req.body.U_ID
		Rating : req.body.Rating
    }

    var sql = 'INSERT INTO REVIEW VALUES (?, ?, ?);'
    var params = [data.v_id, data.U_ID, data.Rating]
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

app.delete("/Video_Game//:v_id/Review", (req, res) => {
    var data = {
        v_id : req.params.v_id
		U_ID : req.body.U_ID
		Rating : req.body.Rating
    }
    var params = [data.v_id, data.U_ID, data.Rating];
    db.run(
        'DELETE FROM PUBLISHES WHERE V_ID = ? AND U_ID = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})