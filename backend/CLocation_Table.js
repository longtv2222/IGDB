

/******************************CLOCATION*********************************/
app.get("/Competition/clocation_table/", (req, res) => {
    var sql = "SELECT * FROM CLOCATION_TABLE;"
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

app.get("/Competition/:cname/clocation_table/", (req, res) => {
    var sql = "SELECT * FROM CLOCATION_TABLE WHERE CNAME = ? COLLATE NOCASE;"
    db.get(sql, req.params.cname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

app.post("/Competition/:cname/clocation_table/", (req, res) => {
    var data = {
        cname: req.params.cname,
        location: req.body.location,
		league: req.body.league
    }

    var sql = 'INSERT INTO clocation_table VALUES (?, ?, ?);'
    var params = [data.pname, data.location, data.league]
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

app.delete("/Competition/:cname/clocation_table/", (req, res, next) => {
    var data = {
        cname: req.params.cname,
        location: req.body.location
    }

    var params = [data.cname, data.location]
    db.run(
        'DELETE FROM CLOCATION_TABLE WHERE CNAME = ? AND LOCATION = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})