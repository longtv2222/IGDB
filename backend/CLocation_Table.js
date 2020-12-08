

// /********************CLOCATION_TABLE******************** */
app.get("/Competition//CLocation_Table/", (req, res) => {
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

app.get("/Competition/:CName/CLocation_Table/", (req, res, next) => {
    var sql = "SELECT * FROM CLOCATION_TABLE WHERE CNAME= ?;"
    db.get(sql, params.CName, (err, row) => {
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

app.post("/Competition/:CName/CLocation_Table/", (req, res, next) => {
    var data = {
        CName: req.params.CName,
        location: req.body.location
		League: req.body.League
    }
	var sql = 'INSERT INTO CLOCATION_TABLE VALUES(?,?,?);'
    var params = [data.CName, data.location, data.League]
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

app.delete("/Competition/:CName/CLocation_Table/", (req, res, next) => {
    var data = {
        CName: req.params.CName,
        location: req.body.location
    }

    var params = [data.dname, data.location]
    db.run(
        'DELETE FROM CLOCATION_TABLE WHERE CNAME = ? AND LOCATION = ?;',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})