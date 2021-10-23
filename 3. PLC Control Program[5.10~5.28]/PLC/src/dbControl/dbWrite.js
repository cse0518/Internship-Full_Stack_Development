const sql = require('../mysql/sql')
const db = require('../mysql/mysql');

require('date-utils');
let newDate = new Date();
let coldate = newDate.toFormat('YYYYMMDDHH24MISS');

/* ===============================================================================
    req_data == user 입력 데이터(protocol, onflag, usernm)
    [db_select] == user가 입력한 protocol 값에 대해 db를 select한 기존 상태 정보들
   =============================================================================== */

// modbus 제어를 실행하고 db 제어
const dbWrite = async (req_data, db_select, socket) => {
    try {
        /* 켜짐 or 꺼짐 표시 */
        // 기존 장비상태(onflag) => user 입력 상태
        console.log("onflag 제어 감지 " + db_select[0].ONFLAG + " => " + req_data.onflag);
        
        if (((db_select[0].ONFLAG || req_data.onflag) != 1) && ((db_select[0].ONFLAG || req_data.onflag) != 0)) {
            // onflag 값이 (0 or 1) 이 아닌 경우
            console.log("onflag 값이 잘못되었습니다.");
            socket.emit("control_result", "onflag 값이 잘못되었습니다.");
            return false;
        } else if (db_select[0].ONFLAG != req_data.onflag) {
            // onflag 값이 바뀐 경우(켜짐 or 꺼짐)
            // nc_r_control_device_t 업데이트
            await db.query(sql.updateControl(req_data.protocol, req_data.onflag, coldate));
            
            // 켜졌는지 꺼졌는지 기존 & 입력 onflag 값 비교 후 controlcode에 저장
            let controlcode = '';

            // 어떤 장비(조명, 인덕션, 에어컨, 선풍기, 컴퓨터)가 켜졌는지 꺼졌는지 확인
            switch (db_select[0].DEVICECD) {
                case 1:
                    req_data.onflag == 1 ? controlcode = 400 : controlcode = 401;
                    break;
                case 2:
                    req_data.onflag == 1 ? controlcode = 402 : controlcode = 403;
                    break;
                case 3:
                    req_data.onflag == 1 ? controlcode = 404 : controlcode = 405;
                    break;
                case 4:
                    req_data.onflag == 1 ? controlcode = 406 : controlcode = 407;
                    break;
                case 5:
                    req_data.onflag == 1 ? controlcode = 408 : controlcode = 409;
                    break;
                default:
                    console.log("제어 대상이 존재 하지 않습니다!");
                    break;
            }

            // 제어 코드 값(controlcode)에 대한 내용(CONTROLMSG) 조회
            let [code] = await db.query(sql.selectCode(controlcode));

            // 장비 제어 정보 nc_r_control_list_t 에 저장
            await db.query(sql.insertcontrolRecord(
                db_select[0].SKEY,
                db_select[0].GKEY,
                db_select[0].LOCATIONCD,
                db_select[0].DEVICECD,
                code[0].CONTROLCODE,
                code[0].CONTROLMSG,
                req_data.usernm,
                db_select[0].REGDATE
            ));
            
            socket.emit("control_result", db_select[0].DEVICENM + " 제어 완료!");
            return true;
        } else if (req_data.onflag == 1) {
            socket.emit("control_result", "이미 켜져있습니다.");
            console.log("이미 켜져있습니다.");
            return false;
        } else if (req_data.onflag == 0) {
            socket.emit("control_result", "이미 꺼져있습니다.");
            console.log("이미 꺼져있습니다.");
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbWrite;
