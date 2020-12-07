

/*****************************************HAS**************** */
app.get("/Video_Game/has", (req, res) => {
    var sql = "SELECT * FROM HAS NATURAL JOIN ESPORT;"
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

app.get("/Video_Game/:v_id/has", (req, res) => {
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

app.post("/Video_Game/:v_id/has", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        league : req.body.league
		genre : req.body.genre
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

app.delete("/Video_Game/:v_id/has", (req, res) => {
    var data = {
        v_id: req.params.v_id,
        league : req.body.league
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