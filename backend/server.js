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


//Sample code
/*
app.get("/api/user", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


app.post("/api/user/", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }

    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})



app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : undefined
    }
    db.run(
        `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email), 
           password = coalesce(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})
*/


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
            "U_ID": this.changes
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
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
})




// /********************COMPETITION******************** */
// app.get("/CLocation_Table", (req, res, next) => {
//     var sql = "SELECT * FROM CLOCATION_TABLE;"
//     var params = []
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": rows
//         })
//     });
// });
// /////////////////////THIS NEEDS REVIEW
// app.get("/CLocation_Table/:CName/:League", (req, res, next) => {
//     var sql = "SELECT * FROM CLOCATION_TABLE WHERE CNAME = ? AND LEAGUE = ?;"
//     var params = [req.params.id]
//     db.get(sql, params, (err, row) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
//         res.json({
//             "data": row
//         })
//     });
// });

// ///THIS/////////////////////////////NEEDS REVIEW
// app.post("/Competition/", (req, res, next) => {
//     var errors = []
//     if (!req.body.id) {
//         errors.push("No CName key specified");
//     }
//     var data = {
//         CName: req.body.id,
//         Location: req.body.Location,
//         League: req.body.League
//     }

//     var sql = 'INSERT INTO COMPETITION(LOCATION, CNAME, LEAGUE) VALUES (?, ?, ?);'
//     var params = [data.Location, data.CName, data.League]
//     db.run(sql, params, function (err, result) {
//         if (err) {
//             res.status(400).json({ "error": err.message })
//             return;
//         }
//         res.json({
//             "message": "success",
//             "id": this.lastID,
//             "data": data
//         })
//     });
// })

// ////THIS//////////////NEEDS REVIEW
// app.delete("/CLocation_Table/:CName/:League", (req, res, next) => {
//     db.run(
//         'DELETE FROM CLOCATION_TABLE WHERE CNAME = ? AND LEAGUE = ?',
//         req.params.id,
//         function (err, result) {
//             if (err) {
//                 res.status(400).json({ "error": res.message })
//                 return;
//             }
//             res.json({ "message": "deleted", rows: this.changes })
//         });
// })



// app.get("/Player", (req, res, next) => {
//     var sql = "SELECT * FROM PLAYER;"
//     var params = []
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": rows
//         })
//     });
// });

// app.get("/Player/:PlayerName", (req, res, next) => {
//     var sql = "SELECT * FROM PLAYER WHERE PLAYERNAME = ?;"

//     db.get(sql, req.params.id, (err, row) => {
//         if (err) {
//             res.status(400).json({ "error": err.message });
//             return;
//         }
//         res.json({
//             "data": row
//         })
//     });
// });




// /***********************PLAYER***********************/
// app.post("/Player/", (req, res, next) => {
//     var errors = []
//     if (!req.body.id) {
//         errors.push("No PlayerName key specified");
//     }
//     var data = {
//         PlayerName: req.body.id,
//         age: req.body.age,
//         natonality: req.body.nationality,
//         description: req.body.description,
//         p_player_flag: req.body.p_player_flag,
//         org_less_flag: req.body.org_less_flag
//     }

//     var sql = 'INSERT INTO PLAYER (PLAYERNAME, AGE, NATIONALITY, DESCRIPTION, P_PLAYER_FLAG, ORG_LESS_FLAG) VALUES (?, ?, ?, ?, ?, ?);'
//     var params = [data.id]
//     db.run(sql, params, function (err, result) {
//         if (err) {
//             res.status(400).json({ "error": err.message })
//             return;
//         }
//         res.json({
//             "message": "success",
//             "id": this.lastID,
//             "data": data
//         })
//     });
// })


// app.delete("/Player/:PlayerName", (req, res, next) => {
//     db.run(
//         'DELETE FROM PLAYER WHERE PLAYERNAME = ?',
//         req.params.id,
//         function (err, result) {
//             if (err) {
//                 res.status(400).json({ "error": res.message })
//                 return;
//             }
//             res.json({ "message": "deleted", rows: this.changes })
//         });
// })





