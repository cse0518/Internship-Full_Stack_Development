const PLC_Router = require("./routers/plc_control");
const sql = require('./mysql/sql')
const db = require('./mysql/mysql');
const express = require("express");
const app = express();

//모든 웹 브라우저 요청 허용을 cors 사용
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
//데이터를 JSON 형태로 받음 
app.use(express.json());
// 전달 받은 데이터를 자동으로 body만을 보여줌
app.use(express.urlencoded({ extended: false }));

/* ModBus 제어 실행 */
app.use('/api/sock', PLC_Router);

// 라즈베리파이 센서 데이터를 1분마다 받아서 nc_p_integrated_b_t 에 저장
app.post('/api/sensorData', (req, res) => {
    const data = req.body;
    console.log(data);
    db.query(sql.InsertSensorData(data));
})

// 등록되지 않은 경로에 대한 페이지 오류 응답
app.all('*', (req, res) => {
    res.status(404).send('<h1> ERROR - 페이지를 찾을 수 없습니다. </h1>');
});

app.listen(PORT, () => {
    console.log(`listening port:${PORT}`);
}).on('error', err => {
    console.log(err.code);
}).on('close', () => {
    console.log('close');
});
