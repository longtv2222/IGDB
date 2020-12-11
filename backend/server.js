var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
const { Statement, Database } = require("sqlite3");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
router.all('*', requireAut, loadUser)
/* ******************* PAID USER OPERATIONS  ******************* */
app.get("/client/paid_user/login", (req, res) => {
    var data = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    var sql = "SELECT * FROM PAID_USER WHERE USER_NAME = ? AND PASSWORD = ?;"
    var params = [data.username, data.password]

    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).send("Login failed");
            return;
        } 
        rows ? res.send("Login succesfully") : res.send("Login failed")
    });
})

app.post("/client/paid_user/signup", (req, res) => {
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

//**********************************************SIMILAR************************************************

app.get("/Video_Game/Similar_To/:v_id", (req, res) => {
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

app.post("/Video_Game/Similar_To/:v_id", (req, res) => {
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
app.get("/Video_Game/Review", (req, res) => {
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

app.get("/Video_Game/:v_id/Review", (req, res) => {
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

app.post("/Video_Game/:v_id/Review", (req, res) => {
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

app.delete("/Video_Game/:v_id/Review", (req, res) => {
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
app.get("/Video_Game/has", (req, res) => {
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

app.delete("/Video_Game/:v_id/has", (req, res) => {
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
        pname: req.params.pname,
        location: req.body.location
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
        v_id: req.body.v_id
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
        pname: req.params.pname,
        v_id: req.body.v_id
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

app.delete("/publisher/:pname/", (req, res, next) => {
    db.run(
        'DELETE FROM PUBLISHER WHERE PNAME = ?',
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


/********************************PARTICIPATE************************ */
app.get("/player/:playername/participate", (req, res) => {
    var sql = "SELECT * FROM PLAYER NATURAL JOIN PARTICIPATE WHERE PLAYERNAME = ?;"
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

app.delete("/player/:playername/participate/:competitionname", (req, res) => {
    var data = {
        playername: req.params.playername,
        competitionname: req.params.competitionname
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

app.post("/player/:playername/participate/", (req, res) => {
    var sql = 'INSERT INTO PARTICIPATE VALUES(?, ?, ?);'
    var data = {
        cname: req.body.cname,
        playername: req.params.playername,
        league: req.body.league
    }

    var params = [data.cname, data.playername, data.league]
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
    var data = {
        playername: req.body.playername,
        age: req.body.age,
        nationality: req.body.nationality,
        description: req.body.description,
        player_flag: req.body.playerflag,
        org_less_flag: req.body.orglessflag
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
        PlayerName: req.body.PlayerName,
        Year: req.body.Year,
        Month: req.body.Month,
        Day: req.body.Day
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
        PlayerName: req.body.PlayerName,
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

////////////////////TEAM///////////////////////
app.get("/Team/:tname", (req, res) => {
    var sql = "SELECT * FROM TEAM WHERE TNAME = ?;"
    db.all(sql, req.params.tname, (err, row) => {
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

app.get("/Team/", (req, res) => {
    var sql = "SELECT * FROM TEAM;"
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

app.post("/Team/", (req, res) => {

    var data = {
        tname: req.body.tname,
        description: req.body.description,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
    }

    var sql = 'INSERT INTO TEAM VALUES (?, ?, ?, ?, ?);'
    var params = [data.tname, data.description, data.year, data.month, data.day]
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

app.delete("/Team/:tname", (req, res) => {
    var data = {
        tname: req.params.tname,
    }
    var sql = "DELETE FROM TEAM WHERE TNAME = ?;"
    var params = [data.tname, data.league]
    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", rows: this.changes })
    });
});



//////////////////////////////Time_Table///////////////////////////
app.get("/Competition/Time_Table/", (req, res) => {
    var sql = "SELECT * FROM TIME_TABLE;"

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

app.get("/Competition/:cname/Time_Table/", (req, res) => {
    var sql = "SELECT * FROM TIME_TABLE WHERE CNAME = ?;"
    db.all(sql, req.params.cname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

app.delete("/Competition/:cname/Time_Table/", (req, res) => {
    db.run(
        'DELETE FROM TIME_TABLE WHERE CNAME = ?',
        req.params.cname,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})

app.post("/Competition/:cname/Time_Table/", (req, res) => {
    var data = {
        cname: req.params.cname,
        time: req.body.time,
        league: req.body.league
    }

    var sql = 'INSERT INTO TIME_TABLE VALUES(?, ?, ?);'
    var params = [data.time, data.cname, data.league]
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

/******************************CLOCATION*********************************/
app.get("/Competition/clocation_table/", (req, res) => {
    var sql = "SELECT * FROM CLOCATION_TABLE;"

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
        location: req.body.location,
        cname: req.params.cname,
        league: req.body.league
    }

    var sql = 'INSERT INTO CLOCATION_TABLE VALUES (?, ?, ?);'
    var params = [data.location, data.cname, data.league]
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
/////////////////////////Competition////////////////////

app.get("/Competition/:cname", (req, res) => {
    var sql = "SELECT * FROM COMPETITION WHERE CNAME = ?;"
    db.all(sql, req.params.cname, (err, row) => {
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

app.get("/Competition/", (req, res) => {
    var sql = "SELECT * FROM COMPETITION;"
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

app.post("/Competition/", (req, res) => {

    var data = {
        cname: req.body.cname,
        description: req.body.description,
        league: req.body.league,
    }

    var sql = 'INSERT INTO COMPETITION VALUES (?, ?, ?);'
    var params = [data.cname, data.description, data.league]
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



