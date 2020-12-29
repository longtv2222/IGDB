const sqlite3 = require('sqlite3').verbose()


const DBSOURCE = "IGDB.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')

        db.run('PRAGMA foreign_keys = ON;'); //Turn on foreign key checking


        db.run(`CREATE TABLE IF NOT EXISTS DEVELOPER(DNAME CHAR PRIMARY KEY);`);


        db.run(`CREATE TABLE IF NOT EXISTS DLOCATION_TABLE(DNAME CHAR REFERENCES DEVELOPER(DNAME), LOCATION CHAR, PRIMARY KEY(DNAME, LOCATION));`);


        db.run(`CREATE TABLE IF NOT EXISTS PUBLISHER(PNAME CHAR PRIMARY KEY);`);


        db.run(`CREATE TABLE IF NOT EXISTS PLOCATION_TABLE(PNAME CHAR REFERENCES PUBLISHER(PNAME), LOCATION CHAR, PRIMARY KEY(PNAME, LOCATION));`);


        db.run(`CREATE TABLE IF NOT EXISTS PUBLISHES (PNAME CHAR REFERENCES PUBLISHER(PNAME), V_ID INT REFERENCES VIDEO_GAME(V_ID),
                PRIMARY KEY(PNAME, V_ID));`);


        db.run(`CREATE TABLE IF NOT EXISTS VIDEO_GAME(V_ID INTEGER, DESCRIPTION CHAR, VNAME CHAR NOT NULL, RELEASE_STATUS INT NOT NULL, 
                                PRIMARY KEY (V_ID));`);


        db.run('CREATE TABLE IF NOT EXISTS DEVELOPS(V_ID INT REFERENCES VIDEO_GAME(V_ID), DNAME CHAR REFERENCES DEVELOPER(DNAME), PRIMARY KEY(V_ID, DNAME));')


        db.run(`CREATE TABLE IF NOT EXISTS CLIENT(U_ID INT PRIMARY KEY);`);


        db.run(`CREATE TABLE IF NOT EXISTS F2PCLIENT(U_ID INT REFERENCES CLIENT(U_ID) ON DELETE CASCADE, PRIMARY KEY(U_ID));`);

 
        db.run(`CREATE TABLE IF NOT EXISTS PAID_USER(U_ID INT REFERENCES CLIENT(U_ID) ON DELETE CASCADE, USER_NAME CHAR, PASSWORD CHAR NOT NULL,
                                PRIMARY KEY (U_ID));`);

        db.run(`CREATE TABLE IF NOT EXISTS REVIEW(U_ID INT REFERENCES CLIENT(U_ID), V_ID INT REFERENCES VIDEO_GAME(V_ID),
                            RATING INT, PRIMARY KEY(U_ID, V_ID));`);

        db.run(`CREATE TABLE IF NOT EXISTS OPERATING_PLATFORM(V_ID INT REFERENCES VIDEO_GAME(V_ID), PLATFORM CHAR,
                                        PRIMARY KEY(V_ID, PLATFORM));`);

        db.run(`CREATE TABLE IF NOT EXISTS SIMILAR_TO (V_ID INT, SIM_ID INT, 
                PRIMARY KEY (V_ID, SIM_ID), FOREIGN KEY(V_ID) REFERENCES VIDEO_GAME(V_ID));`);


        db.run(`CREATE TABLE IF NOT EXISTS ESPORT (LEAGUE CHAR PRIMARY KEY);`);

   
        db.run(`CREATE TABLE IF NOT EXISTS HAS (V_ID INT REFERENCES VIDEO_GAME(V_ID), LEAGUE CHAR REFERENCES ESPORT(LEAGUE),
                          GENRE CHAR, PRIMARY KEY(V_ID, LEAGUE));`);

        db.run(`CREATE TABLE IF NOT EXISTS TEAM(TNAME CHAR, DESCRIPTION CHAR, YEAR INT, MONTH INT, DAY INT,
                          PRIMARY KEY(TNAME));`);

        db.run(`CREATE TABLE IF NOT EXISTS PLAYER (PLAYERNAME CHAR PRIMARY KEY, AGE INT, NATIONALITY CHAR, DESCRIPTION CHAR, P_PLAYER_FLAG INT, ORG_LESS_FLAG INT);`);

        db.run('CREATE TABLE IF NOT EXISTS TEAM_PARTICIPATE(LEAGUE CHAR REFERENCES ESPORT(LEAGUE), TNAME CHAR REFERENCES TEAM(TNAME), PRIMARY KEY(LEAGUE, TNAME));');

        db.run(`CREATE TABLE IF NOT EXISTS EMPLOYS(TNAME CHAR, PLAYERNAME CHAR, YEAR INT, MONTH INT, DAY INT, FOREIGN KEY(TNAME) REFERENCES TEAM(TNAME), 
        FOREIGN KEY(PLAYERNAME) REFERENCES PLAYER(PLAYERNAME), PRIMARY KEY(TNAME, PLAYERNAME));`);

        db.run(`CREATE TABLE IF NOT EXISTS COMPETITION(CNAME CHAR, DESCRIPTION CHAR, LEAGUE CHAR REFERENCES ESPORT(LEAGUE), PRIMARY KEY(CNAME,LEAGUE));`);

        db.run(`CREATE TABLE IF NOT EXISTS PARTICIPATE (CNAME CHAR, PLAYERNAME CHAR REFERENCES PLAYER(PLAYERNAME), LEAGUE CHAR, FOREIGN KEY (CNAME, LEAGUE) REFERENCES COMPETITION(CNAME, LEAGUE),
                                  PRIMARY KEY(CNAME,PLAYERNAME,LEAGUE));`);

        db.run(`CREATE TABLE IF NOT EXISTS CLOCATION_TABLE(LOCATION CHAR, CNAME CHAR, LEAGUE CHAR, FOREIGN KEY (CNAME, LEAGUE) REFERENCES COMPETITION(CNAME, LEAGUE),
                                     PRIMARY KEY(LOCATION,CNAME,LEAGUE));`);

        db.run(`CREATE TABLE IF NOT EXISTS TIME_TABLE (TIME CHAR, CNAME CHAR, LEAGUE CHAR, PRIMARY KEY(TIME, CNAME, LEAGUE)
                FOREIGN KEY(CNAME, LEAGUE) REFERENCES COMPETITION(CNAME, LEAGUE));`);
    }
});


module.exports = db;

