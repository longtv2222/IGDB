

/*****************************************EMPLOYS**************** */
app.get("/Team/employs", (req, res) => {
    var sql = "SELECT * FROM EMPLOYS NATURAL JOIN PLAYER;"
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

app.get("/Team/:TName/employs", (req, res) => {
    var sql = "SELECT * FROM EMPLOYS NATURAL JOIN PLAYER WHERE TNAME = ?;"

    db.get(sql, req.params.TName, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.post("/Team/:TName/employs", (req, res) => {
    var data = {
        TName: req.params.TName,
		PlayerName : req.body.PlayerName,
        Year : req.body.Year
		Month : req.body.Month
		Day : req.body.Day
    }

    var sql = 'INSERT INTO EMPLOYS VALUES (?, ?, ?, ?, ?);'
    var params = [data.TName, data.PlayerName, data.Year, data.Month, data.Day]
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

app.delete("/Team/:TName/employs", (req, res) => {
    var data = {
        TName: req.params.TName,
		PlayerName : req.body.PlayerName,
    }
   var params = [data.TName, data.PlayerName];
    db.run(
        'DELETE FROM EMPLOYS WHERE TNAME = ? AND PLAYERNAME = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})