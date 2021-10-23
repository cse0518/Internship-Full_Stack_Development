const router = require("express").Router();
const sql = require('../mysql/sql')
const db = require('../mysql/mysql');
const dbWrite = require('../dbControl/dbWrite');

const { appendFile } = require("fs");
const httpServer = require("http").createServer(appendFile);
const io = require("socket.io")(httpServer, { });

// 소켓연결 포트 8989
httpServer.listen(8989);

io.on("connection", (socket) => {
    // user 입력 데이터 받음
    router.post('/control/mode', async function (req, res) {
        try {
            const { protocol, usernm, onflag, endcron } = req.body;

            // db에서 protocol 값에 대한 정보 select
            let [db_select] = await db.query(sql.selectAll(protocol));
            devicenm = db_select[0].DEVICENM;

            // user 입력 데이터
            let req_data = {
                protocol,
                usernm,
                onflag,
                endcron,
                devicenm
            };

            if (endcron) req_data.endcron = endcron;

            console.log('control_data', req_data);
            
            // user 입력 데이터(protocol, onflag, usernm) 소켓 통신으로 전달
            if (req_data) {
                res.json({
                    return: true
                });
                socket.emit("req_data", req_data)
            }
            
            /* 장비 제어 정보를 소켓통신으로 gateway_client에 보내고 true가 return 되었을 때 db 제어 */
            socket.on("success", data => {
                if(data) {
                    dbWrite(req_data, db_select, socket);
                } else {
                    console.log("제어 실패");
                }
            })
        } catch (err) {
            console.error(err);
            res.json({
                result: false
            });
        }
    });
});

module.exports = router;
