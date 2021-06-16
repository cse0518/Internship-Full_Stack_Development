// 제어 상태값 전체 조회
const selectAll = (PROTOCOL) => {
    return `SELECT * FROM nc_r_control_device_t where PROTOCOL = "${PROTOCOL}"`
};

// 제어 코드값 조회
const selectCode = (controlcode) => {
    return `SELECT CONTROLCODE, CONTROLMSG FROM nc_r_control_oid_t where CONTROLCODE = "${controlcode}"`
};

// PROTOCOL 값에 해당하는 센서 onflag 제어
const updateControl = (PROTOCOL, onflag, regdate) => {
    return `UPDATE nc_r_control_device_t set ONFLAG = ${onflag}, REGDATE = "${regdate}" WHERE PROTOCOL = "${PROTOCOL}"`
};

// 제어시 이력 저장
const insertcontrolRecord = (SKEY, GKEY, LOCATIONCD, DEVICECD, controlcode, controlmsg, USERNM, GETDATE) => {
    return `insert into nc_r_control_list_t (SKEY, GKEY, LOCATIONCD, DEVICECD, CONTROLCODE, CONTROLMSG, AUTO_GUBUN, USERNM, GETDATE) 
            values( ${SKEY},${GKEY},${LOCATIONCD},${DEVICECD},${controlcode},"${controlmsg}",0,"${USERNM}","${GETDATE}" )`
}

// pingCheck
// =================================
const selectSensor = () => {
    return `select * from nc_r_sensor_t`
}

// FaData
const selectFaData = (oid, SENSORCD) => {
    console.log(oid);
    return `select SKEY, GKEY, LOCATIONCD, SENSORCD, o.FACODE , o.FALEVEL , o.FAMSG
            from nc_r_sensor_t, (select  FACODE , FALEVEL , FAMSG
                                 from nc_f_event_oid_t
                                 where FACODE = '${oid}') o
            where SENSORCD = ${SENSORCD}`
}

const selectEventList = (oid, LOCATIONCD) => {
    return `select * from nc_f_event_list_t where FACODE = ${oid} and LOCATIONCD = ${LOCATIONCD}`
}

// ping FaCheck 고장 이력
const insertEventList = ( SKEY, GKEY, PROTOCOL, SENSORCD , FACODE, FALEVEL, FAMSG, GETDATE ) => {
    console.log(SKEY, GKEY, PROTOCOL, SENSORCD ,FACODE, FALEVEL, FAMSG, GETDATE);
    return ` insert into nc_f_event_list_t (SKEY, GKEY, PROTOCOL, SENSORCD, FACODE, FALEVEL, FAMSG, GETDATE)
             values ( ${SKEY}, ${GKEY}, "${PROTOCOL}", ${SENSORCD} , "${FACODE}", ${FALEVEL}, "${FAMSG}", "${GETDATE}")`
}

// ping FaFlag update
const updateFaFlag = (FLTFLAG, LOCATIONCD) => {
    console.log('FLTFLAG, LOCATIONCD : ', FLTFLAG, LOCATIONCD);
    return `update nc_r_sensor_t set FLTFLAG = ${FLTFLAG} where LOCATIONCD = ${LOCATIONCD}`
}

// ping Facheck Hist
const insertEventHist = ( SKEY, GKEY, LOCATIONCD, SENSORCD , FACODE, FALEVEL, FAMSG, GETDATE, coldate) => {
    console.log('history data ::: ',SKEY, GKEY, LOCATIONCD, SENSORCD , FACODE, FALEVEL, FAMSG, GETDATE, coldate);
     return `insert into nc_f_event_his_t (SKEY, GKEY, LOCATIONCD, SENSORCD , FACODE, FALEVEL, FAMSG, GETDATE, RECOVERYDATE)
             values( ${SKEY}, ${GKEY}, ${LOCATIONCD}, ${SENSORCD}, '${FACODE}', ${FALEVEL}, '${FAMSG}', '${GETDATE}', '${coldate}')`
}

// ping FaCheck delete
const deleteEventList = (SKEY, GKEY, LOCATIONCD, SENSORCD,  FACODE) => {
    console.log('event list data :: ', SKEY, GKEY, LOCATIONCD, SENSORCD, FACODE);
    return `delete from nc_f_event_list_t where SKEY = ${SKEY} and GKEY = ${GKEY} and LOCATIONCD = ${LOCATIONCD} and SENSORCD = ${SENSORCD} and FACODE = ${FACODE}`
}

// sensorCheck
// Recent Sensor Date
const selectRecentDate = () => {
    return `select date_format(max(regdate), '%Y%m%d%H%i%s') regdate from nc_p_integrated_b_t`
}

// insert sensor data
const InsertSensorData = (data) => {
    return `INSERT INTO nc_p_integrated_b_t (temp, humi, co2, dust_pm25, regdate, sensorcd) 
            VALUES( ${data.temp}, ${data.humi}, ${data.co2}, ${data.dust_pm25}, now(), 1)`
}

module.exports = {
    selectAll,
    selectCode,
    updateControl,
    insertcontrolRecord,
    selectSensor,
    selectFaData,
    selectEventList,
    insertEventList,
    updateFaFlag,
    insertEventHist,
    deleteEventList,
    selectRecentDate,
    InsertSensorData
};
