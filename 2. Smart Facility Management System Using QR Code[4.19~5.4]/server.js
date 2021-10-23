const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './client/src/images'})
app.use('/image', express.static('./client/src/images'));

app.post('/api/login', (req, res) => {
    const { userid, password } = req.body;
    let sql = 'SELECT COUNT(*) CNT FROM user WHERE user_id=? AND user_password=?';
    let user_id = req.body.userid;
    let user_password = req.body.password;
    let params = [user_id, user_password];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/sulbis', (req, res) => {
    connection.query(
        "SELECT S.SULBI_CODE, S.SULBI_TITLE, S.SULBI_TITLE_SECOND, S.SULBI_TITLE_THIRD, L.LOCATION_NAME, S.SULBI_PROGRESS, S.SULBI_NAME, DATE_FORMAT(S.SULBI_START, '%Y-%m-%d') SULBI_START FROM sulbi S LEFT OUTER JOIN location L ON S.LOCATION_NAME = L.LOCATION_NAME LEFT OUTER JOIN sulbi_code C ON S.SULBI_TITLE = C.CODE WHERE SULBI_ISDELETED = 0 order BY SULBI_CODE;",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/sulbi/titles', (req, res) => {
    connection.query(
        "SELECT SULBI_TITLE FROM sulbi_code",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/sulbis', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO sulbi VALUES (null, ?, null, null, ?, ?, ?, ?, now(), 0)';
    let SULBI_TITLE = req.body.SULBI_TITLE;
    let LOCATION_NAME = req.body.LOCATION_NAME;
    let SULBI_PROGRESS = req.body.SULBI_PROGRESS;
    let SULBI_NAME = req.body.SULBI_NAME;
    let SULBI_START = req.body.SULBI_START;
    let params = [SULBI_TITLE, LOCATION_NAME, SULBI_PROGRESS, SULBI_NAME, SULBI_START];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.delete('/api/sulbis/:SULBI_CODE', (req, res) => {
    let sql = 'UPDATE sulbi SET SULBI_ISDELETED = 1 WHERE SULBI_CODE = ?';
    let params = [req.params.SULBI_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/sulbis/patch/:SULBI_CODE', upload.single('image'), (req, res) => {
    let sql = 'UPDATE sulbi SET SULBI_TITLE=?, SULBI_TITLE_SECOND=?, SULBI_TITLE_THIRD=?, LOCATION_NAME=?, SULBI_PROGRESS=?, SULBI_NAME=?, SULBI_START=? WHERE SULBI_CODE = ?';
    let SULBI_CODE = req.params.SULBI_CODE;
    let SULBI_TITLE = req.body.SULBI_TITLE;
    let SULBI_TITLE_SECOND = req.body.SULBI_TITLE_SECOND;
    let SULBI_TITLE_THIRD = req.body.SULBI_TITLE_THIRD;
    let LOCATION_NAME = req.body.LOCATION_NAME;
    let SULBI_PROGRESS = req.body.SULBI_PROGRESS;
    let SULBI_NAME = req.body.SULBI_NAME;
    let SULBI_START = req.body.SULBI_START;
    let params = [SULBI_TITLE, SULBI_TITLE_SECOND, SULBI_TITLE_THIRD, LOCATION_NAME, SULBI_PROGRESS, SULBI_NAME, SULBI_START, SULBI_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/schedules', (req, res) => {
    connection.query(
        "SELECT JUNGBI_CODE, SULBI_TITLE, JUNGBI_TYPE, JUNGBI_TITLE, LOCATION_NAME, JUNGBI_CHECKLIST, JUNGBI_NAME, DATE_FORMAT(JUNGBI_START, '%Y-%m-%d') JUNGBI_START, JUNGBI_CREATEDATE, JUNGBI_ISDELETED FROM jungbi WHERE JUNGBI_ISDELETED = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/schedules', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO jungbi VALUES (null, ?, ?, ?, ?, ?, ?, ?, now(), 0)';
    let JUNGBI_CODE = req.body.JUNGBI_CODE;
    let SULBI_TITLE = req.body.SULBI_TITLE;
    let JUNGBI_TYPE = req.body.JUNGBI_TYPE;
    let LOCATION_NAME = req.body.LOCATION_NAME;
    let JUNGBI_CHECKLIST = req.body.JUNGBI_CHECKLIST;
    let JUNGBI_NAME = req.body.JUNGBI_NAME;
    let JUNGBI_START = req.body.JUNGBI_START;
    let params = [SULBI_TITLE, JUNGBI_TYPE, SULBI_TITLE, LOCATION_NAME, JUNGBI_CHECKLIST, JUNGBI_NAME, JUNGBI_START];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.delete('/api/schedules/:JUNGBI_CODE', (req, res) => {
    let sql = 'UPDATE jungbi SET JUNGBI_ISDELETED = 1 WHERE JUNGBI_CODE = ?';
    let params = [req.params.JUNGBI_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/schedules/patch/:JUNGBI_CODE', upload.single('image'), (req, res) => {
    let sql = 'UPDATE jungbi SET SULBI_TITLE=?, JUNGBI_TITLE=?, JUNGBI_TYPE=?, LOCATION_NAME=?, JUNGBI_CHECKLIST=?, JUNGBI_NAME=?, JUNGBI_START=? WHERE JUNGBI_CODE = ?';
    let JUNGBI_CODE = req.params.JUNGBI_CODE;
    let SULBI_TITLE = req.body.SULBI_TITLE;
    let JUNGBI_TYPE = req.body.JUNGBI_TYPE;
    let LOCATION_NAME = req.body.LOCATION_NAME;
    let JUNGBI_CHECKLIST = req.body.JUNGBI_CHECKLIST;
    let JUNGBI_NAME = req.body.JUNGBI_NAME;
    let JUNGBI_START = req.body.JUNGBI_START;
    let params = [SULBI_TITLE, SULBI_TITLE, JUNGBI_TYPE, LOCATION_NAME, JUNGBI_CHECKLIST, JUNGBI_NAME, JUNGBI_START, JUNGBI_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/calendar', (req, res) => {
    connection.query(
        "SELECT JUNGBI_TITLE title, DATE_FORMAT(JUNGBI_START, '%Y-%m-%d') date FROM jungbi",  // 칼럼 형식 일치
        (err, rows, fields) => {
            res.json(rows);
        }
    )
});

app.post('/api/calendar', upload.single('image'), (req, res) => {
    const JUNGBI_TITLE = req.body.JUNGBI_TITLE;
    const JUNGBI_NAME = req.body.JUNGBI_NAME;
    const JUNGBI_START = req.body.JUNGBI_START;
    connection.query(
        `INSERT INTO jungbi(JUNGBI_TITLE, JUNGBI_NAME, JUNGBI_START) VALUES('${JUNGBI_TITLE}', '${JUNGBI_NAME}', '${JUNGBI_START}')`,       // 칼럼 형식 일치
        (err, rows, fields) => {
            if(err) {
                console.log(err);
                res.json(0);
                return;
            }
            res.json(1);
        }
    )
});

app.get('/api/jajaeqr', (req, res) => {
    connection.query(
        "SELECT JAJAE_CODE, JAJAE_NAME, JAJAE_TYPE, DATE_FORMAT(JAJAE_DATE, '%Y-%m-%d') JAJAE_DATE, JAJAE_GRADE, JAJAE_IMG, JAJAE_ISDELETED, JAJAE_QR FROM jajae",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/jajaeqr', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO jajae VALUES (null, null, ?, ?, ?, ?, ?, ?, now(), 0)';
    let JAJAE_NAME = req.body.JAJAE_NAME;
    let JAJAE_TYPE = req.body.JAJAE_TYPE;
    let JAJAE_GRADE = req.body.JAJAE_GRADE;
    let JAJAE_DATE = req.body.JAJAE_DATE;
    let image = '/image/' + req.file.filename;
    let JAJAE_QR = req.body.JAJAE_QR;
    let params = [JAJAE_NAME, JAJAE_TYPE, JAJAE_DATE, JAJAE_GRADE, image, JAJAE_QR];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(params);
        }
    );
});

app.get('/api/jajae/type', (req, res) => {
    connection.query(
        "SELECT CODE, JAJAE_TYPE from jajae_code",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.delete('/api/jajaeqr/:JAJAE_CODE', (req, res) => {
    let sql = 'DELETE FROM jajae WHERE JAJAE_CODE=?';
    let params = [req.params.JAJAE_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/jajae/patch/:JAJAE_CODE', upload.single('image'), (req, res) => {
    let sql = 'UPDATE jajae SET JAJAE_NAME=?, JAJAE_TYPE=?, JAJAE_GRADE=?, JAJAE_DATE=?, JAJAE_QR=?, JAJAE_IMG=? WHERE JAJAE_CODE = ?';
    let JAJAE_CODE = req.params.JAJAE_CODE;
    let JAJAE_NAME = req.body.JAJAE_NAME;
    let JAJAE_TYPE = req.body.JAJAE_TYPE;
    let JAJAE_GRADE = req.body.JAJAE_GRADE;
    let JAJAE_DATE = req.body.JAJAE_DATE;
    let JAJAE_QR = req.body.JAJAE_QR;
    let image = '/image/' + req.file.filename;
    let params = [JAJAE_NAME, JAJAE_TYPE, JAJAE_GRADE, JAJAE_DATE, JAJAE_QR, image, JAJAE_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/code/titles', (req, res) => {
    connection.query(
        "SELECT CODE, SULBI_TITLE from sulbi_code",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/sulbi/locations', (req, res) => {
    connection.query(
        "SELECT * FROM location",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/codes', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO sulbi_code VALUES (?, ?)';
    let CODE = req.body.CODE;
    let SULBI_TITLE = req.body.SULBI_TITLE;
    let params = [CODE, SULBI_TITLE];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

// app.use('/image', express.static('./client/src/images'));
app.post('/api/codes/location', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO location VALUES (?, ?, ?)';
    let LOCATION_CODE = req.body.LOCATION_CODE;
    let LOCATION_NAME = req.body.LOCATION_NAME;
    let image = '/image/' + req.file.filename;
    let params = [LOCATION_CODE, LOCATION_NAME, image];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.delete('/api/codes/:CODE', (req, res) => {
    let sql = 'DELETE FROM sulbi_code WHERE CODE=?';
    let params = [req.params.CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.delete('/api/codes/location/:LOCATION_CODE', (req, res) => {
    let sql = 'DELETE FROM location WHERE LOCATION_CODE=?';
    let params = [req.params.LOCATION_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/codes/patch/:CODE', upload.single('image'), (req, res) => {
    let sql = 'UPDATE sulbi_code SET CODE=?, SULBI_TITLE=? WHERE CODE = ?';
    let CODE = req.body.CODE;
    let SULBI_TITLE = req.body.SULBI_TITLE;
    let params = [CODE, SULBI_TITLE, CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/codes/location/patch/:LOCATION_CODE', upload.single('image'), (req, res) => {
    let sql = 'UPDATE location SET LOCATION_CODE=?, LOCATION_NAME=?, LOCATION_IMG=? WHERE LOCATION_CODE = ?';
    let LOCATION_CODE = req.body.LOCATION_CODE;
    let LOCATION_NAME = req.body.LOCATION_NAME;
    let image = '/image/' + req.file.filename;
    let params = [LOCATION_CODE, LOCATION_NAME, image, LOCATION_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/detail', upload.single('image') ,(req, res) => {
    let sql  = "SELECT SULBI_CODE, SULBI_PROGRESS, SULBI_TITLE_SECOND, SULBI_TITLE_THIRD, DATE_FORMAT(SULBI_START, '%Y-%m-%d') SULBI_START , SULBI_NAME, LOCATION_NAME FROM sulbi WHERE SULBI_CODE =?";
    let CODE = req.query.code;
    let params = [CODE];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/jajae', upload.single('image') ,(req, res) => {
    let sql  = "SELECT JAJAE_CODE, JAJAE_NAME, JAJAE_TYPE, JAJAE_GRADE, DATE_FORMAT(JAJAE_DATE, '%Y-%m-%d') JAJAE_DATE, JAJAE_IMG FROM jajae WHERE SULBI_CODE =?;";
    let CODE = req.query.code;
    let params = [CODE];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/count1', (req, res) => {
    connection.query(
        "select COUNT(sulbi_code) count1 from sulbi where SULBI_START > DATE_FORMAT(NOW(), '%Y-%m-%d');",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});
app.get('/api/count2', (req, res) => {
    connection.query(
        "select COUNT(sulbi_code) count2 from sulbi where SULBI_START = DATE_FORMAT(NOW(), '%Y-%m-%d');",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});
app.get('/api/count3', (req, res) => {
    connection.query(
        "select COUNT(jungbi_code) count3 from jungbi where JUNGBI_START > DATE_FORMAT(NOW(), '%Y-%m-%d');",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});
app.get('/api/count4', (req, res) => {
    connection.query(
        "select COUNT(jungbi_code) count4 from jungbi where JUNGBI_START = DATE_FORMAT(NOW(), '%Y-%m-%d');",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/chart', (req, res) => {
    connection.query(
        "SELECT DATE_FORMAT(startdate, '%Y-%m-%d') date, IFNULL(today1, 0) today1, IFNULL(today2, 0) today2 FROM (SELECT SULBI_START startdate FROM sulbi UNION SELECT JUNGBI_START FROM jungbi) a LEFT JOIN (SELECT SULBI_START, COUNT(SULBI_CODE) today1 FROM sulbi GROUP BY SULBI_START ORDER BY SULBI_START) b ON a.startdate = b.SULBI_START LEFT JOIN (SELECT JUNGBI_START, COUNT(JUNGBI_START) today2 FROM jungbi GROUP BY JUNGBI_START ORDER BY JUNGBI_START) c ON a.startdate = c.JUNGBI_START WHERE DATE_ADD(NOW(), INTERVAL -5 DAY) < startdate && startdate < DATE_ADD(NOW(), INTERVAL 5 DAY) ORDER BY startdate;",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/jajaes/patch/:JAJAE_CODE', upload.single('image'), (req, res) => {
    let sql = 'UPDATE jajae SET JAJAE_CODE=?, JAJAE_NAME=?, JAJAE_TYPE=?, JAJAE_GRADE=?, JAJAE_DATE=?, JAJAE_IMG=? WHERE JAJAE_CODE = ?';
    let JAJAE_CODE = req.body.JAJAE_CODE;
    let JAJAE_NAME = req.body.JAJAE_NAME;
    let JAJAE_TYPE = req.body.JAJAE_TYPE;
    let JAJAE_GRADE = req.body.JAJAE_GRADE;
    let JAJAE_DATE = req.body.JAJAE_DATE;
    let JAJAE_IMG = req.body.JAJAE_IMG;
    let params = [JAJAE_CODE, JAJAE_NAME, JAJAE_TYPE, JAJAE_GRADE, JAJAE_DATE, JAJAE_IMG, JAJAE_CODE];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});