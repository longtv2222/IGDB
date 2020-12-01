var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "D.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE DEVELOPER(DNAME CHAR PRIMARY KEY);`);

        db.run(`CREATE TABLE DLOCATION_TABLE(DNAME CHAR PRIMARY KEY REFERENCES DEVELOPER(DNAME), LOCATION CHAR);`);
        
        db.run(`CREATE TABLE PUBLISHER(PNAME CHAR PRIMARY KEY);`);
        
        db.run(`CREATE TABLE PLOCATION_TABLE(PNAME CHAR PRIMARY KEY REFERENCES PUBLISHER(PNAME), LOCATION CHAR);`);
        
        db.run(`CREATE TABLE VIDEO_GAME(V_ID INT, DESCRIPTION CHAR, VNAME CHAR, RELEASE_STATUS INT, 
                                DNAME CHAR REFERENCES DEVELOPER(DNAME),
                                PRIMARY KEY (V_ID,DNAME));`);
                                
       db.run(`CREATE TABLE CLIENT(U_ID INT PRIMARY KEY);`); 
        
       db.run(`CREATE TABLE F2PCLIENT(U_ID INT REFERENCES CLIENT(U_ID) ON DELETE CASCADE, PRIMARY KEY(U_ID));`);
        
       db.run(`CREATE TABLE PAID_USER(U_ID INT REFERENCES CLIENT(U_ID) ON DELETE CASCADE, USER_NAME CHAR, PASSWORD CHAR,
                                PRIMARY KEY (U_ID));`);
                                
        db.run(`CREATE TABLE REVIEW(U_ID INT REFERENCES CLIENT(U_ID), V_ID INT REFERENCES VIDEO_GAME(V_ID),
                            RATING INT,DNAME CHAR REFERENCES VIDEO_GAME(DNAME), PRIMARY KEY(U_ID, V_ID, DNAME));`);
                            
        db.run(`CREATE TABLE OPERATING_PLATFORM(V_ID INT REFERENCES VIDEO_GAME(V_ID), DNAME CHAR REFERENCES DEVELOPER(DNAME), PLATFORM CHAR,
                                        PRIMARY KEY(V_ID,DNAME,PLATFORM));`);
        
       db.run( `CREATE TABLE SIMILAR_TO (DNAME CHAR REFERENCES DEVELOPER(DNAME), V_ID INT REFERENCES VIDEO_GAME(V_ID), SIMDNAME CHAR REFERENCES DEVELOPER(DNAME),
                                 SIMV_ID INT REFERENCES VIDEO_GAME(V_ID), PRIMARY KEY (DNAME, V_ID, SIMDNAME, SIMV_ID));`);
        
       db.run( `CREATE TABLE PUBLISHES (PNAME CHAR REFERENCES PUBLISHER(PNAME), V_ID INT REFERENCES VIDEO_GAME(V_ID),
                                DNAME CHAR REFERENCES DEVELOPER(DNAME), PRIMARY KEY(PNAME, V_ID, DNAME));`);
        
        db.run(`CREATE TABLE ESPORT (LEAGUE CHAR PRIMARY KEY);`);
        
        db.run(`CREATE TABLE HAS (V_ID INT REFERENCES VIDEO_GAME(V_ID), DNAME CHAR REFERENCES DEVELOPER(DNAME), LEAGUE CHAR REFERENCES ESPORT(LEAGUE),
                          GENRE CHAR, PRIMARY KEY(V_ID, DNAME, LEAGUE));`);
                          
        db.run(`CREATE TABLE TEAM(LEAGUE CHAR REFERENCES ESPORT(LEAGUE), TNAME CHAR, DESCRIPTION CHAR, YEAR INT, MONTH INT, DAY INT,
                          PRIMARY KEY(LEAGUE, TNAME));`);
        
        db.run(`CREATE TABLE PLAYER (PLAYERNAME CHAR PRIMARY KEY, AGE INT, NATIONALITY CHAR, DESCRIPTION CHAR, P_PLAYER_FLAG INT, ORG_LESS_FLAG INT);`);
        
        db.run(`CREATE TABLE EMPLOYS(TNAME CHAR REFERENCES TEAM(TNAME), PLAYERNAME CHAR REFERENCES PLAYER(PLAYERNAME), YEAR INT, MONTH INT, DAY INT, PRIMARY KEY(TNAME,PLAYERNAME));`);
        
        db.run(`CREATE TABLE COMPETITION(CNAME CHAR, DESCRIPTION CHAR, LEAGUE CHAR REFERENCES ESPORT(LEAGUE), PRIMARY KEY(CNAME,LEAGUE));`);
        
        db.run(`CREATE TABLE PARTICIPATE (CNAME CHAR REFERENCES COMPETITION(CNAME), PLAYERNAME CHAR REFERENCES PLAYER(PLAYERNAME),
                                  PRIMARY KEY(CNAME,PLAYERNAME));`);
                        
        db.run(`CREATE TABLE CLOCATION_TABLE(LOCATION CHAR, CNAME CHAR REFERENCES COMPETITION(CNAME), 
                                     PRIMARY KEY(LOCATION,CNAME));`);
                                
        db.run(`CREATE TABLE TIME_TABLE (TIME CHAR, CNAME CHAR REFERENCES COMPETITION(CNAME));`);
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    // var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                    // db.run(insert, ["admin", "admin@example.com", md5("admin123456")])
                    // db.run(insert, ["user", "user@example.com", md5("user123456")])
                }
            };
    }
});


module.exports = db;


function createTable() {
    console.log("alo");
}
