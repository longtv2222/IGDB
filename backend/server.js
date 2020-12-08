var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
const { Statement } = require("sqlite3");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

/* ******************* PAID USER OPERATIONS  ******************* */
app.post("/client/paid_user/", (req, res) => {
    var errors = []
    if (Object.keys(req.body.id).length == 0) {
        errors.push("No user id specified");
    }

    if (Object.keys(req.body.username).length == 0) {
        errors.push("No username specified");
    }

    if (!req.body.password) {
        errors.push("No user password specified");
    }

    var data = {
        u_id: req.body.id,
        username: req.body.username,
        password: md5(req.body.password) //md5 to hash the password
    }


    var sql = 'INSERT INTO PAID_USER(U_ID, USER_NAME, PASSWORD) VALUES (?, ?, ?);'
    var params = [data.u_id, data.username, data.password]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "id": this.lastID,
            "data": data
        })
    });
})

app.get("/client/paid_user/:id", (req, res) => {
    var sql = "SELECT * FROM PAID_USER WHERE U_ID = ?;"

    db.get(sql, req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.get("/client/paid_user", (req, res) => {
    var sql = "SELECT * FROM PAID_USER;"
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

app.delete("/client/paid_user/:id", (req, res) => {
    db.run(
        'DELETE FROM PAID_USER WHERE U_ID = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

/* ********************** F2P CLIENT *********************** */

app.get("/client/f2pclient", (req, res) => {
    var sql = "SELECT * FROM F2PClient;"
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

app.delete("/client/f2pclient/:u_id", (req, res) => {
    db.run(
        'DELETE FROM F2PCLIENT WHERE U_ID = ?',
        req.params.u_id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

app.post("/client/f2pclient/", (req, res) => {
    var sql = "INSERT INTO F2PCLIENT VALUES (?);"
    var params = [req.body.u_id]
    db.run(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": params
        })
    });
});
/* ******************* CLIENT OPERATIONS  ******************* */
app.get("/client", (req, res) => {
    var sql = "SELECT * FROM CLIENT;"
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

app.get("/client/:id", (req, res) => {
    var sql = "SELECT * FROM CLIENT WHERE U_ID = ?;"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.post("/client/", (req, res) => {
    var errors = []
    if (!req.body.id) {
        errors.push("No user id specified");
    }
    var data = {
        id: req.body.id
    }

    var sql = 'INSERT INTO CLIENT VALUES (?);'
    var params = [data.id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "U_ID": data
        })
    });
})

app.delete("/client/:id", (req, res) => {
    db.run(
        'DELETE FROM CLIENT WHERE U_ID = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

/* **************************DEVELOPER************************************ */

app.get("/developer/:dname", (req, res) => {
    var sql = "SELECT * FROM DEVELOPER WHERE DNAME = ?;"
    db.get(sql, req.params.dname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.post("/developer/", (req, res) => {
    var errors = []
    if (!req.body.DName) {
        errors.push("No developer name is specified");
    }

    var sql = 'INSERT INTO DEVELOPER VALUES (?);'
    var data = req.body.DName
    db.run(sql, data, (err, result) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "DName": data
        })
    });
})

app.get("/developer/", (req, res) => {
    var sql = "SELECT * FROM DEVELOPER;"
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.delete("/developer/:dname", (req, res) => {
    db.run(
        'DELETE FROM DEVELOPER WHERE DName = ?;',
        req.params.dname,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

// //////////////////////////DLOCATION_TABLE/////////////////////////////////////////

app.get("/developer/:dname/dlocation_table/", (req, res, next) => {
    var sql = "SELECT * FROM DLOCATION_TABLE WHERE DName = ?;"
    var params = [req.params.dname]
    db.all(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.post("/developer/:dname/dlocation_table/", (req, res, next) => {
    var errors = []
    if (!req.body.dname) {
        errors.push("No developer name is specified");
    }

    var sql = 'INSERT INTO DLOCATION_TABLE VALUES(?,?);'
    var data = {
        u_id: req.params.dname,
        location: req.body.location
    }

    var params = [data.u_id, data.location]
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            data
        })
    });
})

app.delete("/developer/:dname/dlocation_table/:location", (req, res, next) => {
    var data = {
        dname: req.params.dname,
        location: req.params.location
    }

    var params = [data.dname, data.location]
    db.run(
        'DELETE FROM DLOCATION_TABLE WHERE DName = ? AND LOCATION = ?;',
        params,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

/******************OPERATING PLATFORM ****************************/

app.get("/Video_Game/operating_platform", (req, res) => {
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

app.get("/Video_Game/:v_id/operating_platform", (req, res) => {
    var sql = "SELECT * FROM OPERATING_PLATFORM WHERE V_ID = ?;"
    db.all(sql, req.params.v_id,(err, rows) => {
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

app.post("/Video_Game/:v_id/operating_platform", (req, res) => {
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

app.delete("/Video_Game/:v_id/operating_platform", (req, res) => {
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

// /************ VIDEO_GAME **************** */
app.get("/Video_Game/", (req, res) => {
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

app.get("/Video_Game/:v_id", (req, res) => {
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

app.delete("/Video_Game/:v_id", (req, res) => {
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

app.post("/Video_Game/", (req, res) => {
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

// //////////////////////////DEVELOPS/////////////////////////////////////////

app.get("/developer/:dname/develops", (req, res) => { //All video games this developer develops
    var sql = "SELECT * FROM DEVELOPS AS D NATURAL JOIN VIDEO_GAME WHERE D.DNAME = ?;"
    var params = [req.params.dname]

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.post("/developer/:dname/develops/", (req, res) => {
    var data = {
        v_id: req.body.v_id,
        dname: req.params.dname
    }

    var sql = 'INSERT INTO DEVELOPS VALUES (?,?);'
    var params = [data.v_id, data.dname]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "U_ID": data
        })
    });
})

app.delete("/developer/:dname/develops/", (req, res) => {
    var data = {
        v_id: req.body.v_id,
        dname: req.params.dname
    }
    var params = [data.v_id, data.dname]
    db.run(
        'DELETE FROM DEVELOPS WHERE V_ID = ? AND DNAME = ?',
        params,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

/******************************PLOCATION*********************************/
app.get("/publisher/plocation_table/", (req, res) => {
    var sql = "SELECT * FROM PLOCATION_TABLE;"
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

app.get("/publisher/:pname/plocation_table/", (req, res) => {
    var sql = "SELECT * FROM PLOCATION_TABLE WHERE PNAME = ? COLLATE NOCASE;"
    db.get(sql, req.params.pname, (err, row) => {
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

app.post("/publisher/:pname/plocation_table/", (req, res) => {
    var data = {
        pname: req.params.pname,
        location: req.body.location
    }

    var sql = 'INSERT INTO plocation_table VALUES (?, ?);'
    var params = [data.pname, data.location]
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

app.delete("/publisher/:pname/plocation_table/", (req, res, next) => {
    var data = {
        pname : req.params.pname,
        location : req.body.location
    }

    var params = [data.pname, data.location]
    db.run(
        'DELETE FROM PLOCATION_TABLE WHERE PNAME = ? AND LOCATION = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

/*****************************************PUBLISHES**************** */
app.get("/publisher/publishes", (req, res) => {
    var sql = "SELECT * FROM PUBLISHES NATURAL JOIN VIDEO_GAME;"
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

app.get("/publisher/:pname/publishes", (req, res) => {
    var sql = "SELECT * FROM PUBLISHES NATURAL JOIN VIDEO_GAME WHERE PNAME = ?;"

    db.get(sql, req.params.pname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.post("/publisher/:pname/publishes", (req, res) => {
    var data = {
        pname: req.params.pname,
        v_id : req.body.v_id
    }

    var sql = 'INSERT INTO PUBLISHES VALUES (?, ?);'
    var params = [data.pname, data.v_id]
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

app.delete("/publisher/:pname/publishes", (req, res) => {
    var data = {
        pname : req.params.pname,
        v_id : req.body.v_id
    }
    var params = [data.pname, data.v_id];
    db.run(
        'DELETE FROM PUBLISHES WHERE PNAME = ? AND V_ID = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

// //////////////////////////////////PUBLISHER////////////////////////////////////////////////////////////////////////
app.get("/publisher", (req, res) => {
    var sql = "SELECT * FROM PUBLISHER;"
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

app.get("/publisher/:pname/", (req, res) => {
    var sql = "SELECT * FROM PUBLISHER WHERE PNAME = ?;"

    db.get(sql, req.params.pname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.post("/publisher/", (req, res) => {
    var errors = []
    if (!req.body.id) {
        errors.push("No PName specified");
    }
    var data = {
        pname: req.body.pname
    }

    var sql = 'INSERT INTO PUBLISHER VALUES (?);'
    var params = [data.pname]
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

app.delete("/publisher/:pname", (req, res) => {
    db.run(
        'DELETE FROM PUBLISHER WHERE pname = ?',
        req.params.pname,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})


/************************ESPORT******************** */
app.get("/esport", (req, res) => {
    var sql = "SELECT * FROM ESPORT;"
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

app.post("/esport/", (req, res) => {
    var sql = 'INSERT INTO ESPORT VALUES (?);'
    var league = req.body.league
    db.run(sql, league, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": league
        })
    });
})

app.delete("/esport/:league", (req, res) => {
    db.run(
        'DELETE FROM ESPORT WHERE league = ?',
        req.params.league,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})


/********************************PARTICIPATE************************ */ //NEED TO TEST
app.get("/player/:playername/participate", (req, res) => {
    var sql = "SELECT * FROM PLAYER NATURAL JOIN PARTICIPATE WHERE PLAYERNAME = ?;"
    db.all(sql,req.params.playername, (err, rows) => {
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

app.delete("/player/:playername/participate/:competitionname", (req, res) => {
    var data = {
        playername : req.params.playername,
        competitionname : req.params.competitionname
    }

    var params = [data.playername, data.competitionname]
    db.run(
        'DELETE FROM PARTICIPATE WHERE PLAYERNAME = ? AND CNAME = ?',
        params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

/******************************PLAYER********************* */
app.get("/player", (req, res) => {
    var sql = "SELECT * FROM PLAYER;"
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

app.get("/player/:playername", (req, res) => {
    var sql = "SELECT * FROM PLAYER WHERE PLAYERNAME = ?;"
    db.all(sql, req.params.playername, (err, rows) => {
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

app.delete("/player/:playername", (req, res) => {
    var sql = "DELETE FROM PLAYER WHERE PLAYERNAME = ?;"
    db.run(sql, req.params.playername, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", rows: this.changes })
    });
});

app.post("/player/", (req, res) => {
    var sql = 'INSERT INTO PLAYER VALUES(?, ?, ?, ?, ?, ?);'
    var data  = {
        playername : req.body.playername,
        age : req.body.age,
        nationality: req.body.nationality,
        description: req.body.description,
        player_flag: req.body.playerflag,
        org_less_flag : req.body.orglessflag
    }

    var params = [data.playername, data.age, data.nationality, data.description, data.player_flag, data.org_less_flag]
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


