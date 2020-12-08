

/*****************************************PARTICIPATE**************** */
app.get("/Competition/Partcipate", (req, res) => {
    var sql = "SELECT * FROM PARTICIPATE NATURAL JOIN PLAYER;"
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

app.get("/Competition/:CName/Partcipate", (req, res) => {
    var sql = "SELECT * FROM PARTICIPATE NATURAL JOIN PLAYER WHERE CNAME = ?;"

    db.all(sql, req.params.pname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.post("/Competition/:CName/Partcipate", (req, res) => {
    var data = {
        CName: req.params.CName,
        PlayerName : req.body.PlayerName,
		League: req.body.League
    }

    var sql = 'INSERT INTO PUBLISHES VALUES (?, ?, ?);'
    var params = [data.CName, data.PlayerName, data.League]
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

app.delete("/Competition/:CName/Partcipate", (req, res) => {
    var data = {
         CName: req.params.CName,
		 PlayerName : req.body.PlayerName
    }
    var params = [data.CName, data.PlayerName;
    db.run(
        'DELETE FROM PUBLISHES WHERE CName = ? AND PlayerName = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})