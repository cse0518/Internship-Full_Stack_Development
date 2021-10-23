const io = require('socket.io-client');
const modbus_control = require('./modbus/sensor_control');

const socket = io('http://192.168.10.89:8989');

// 서버 연결 확인
socket.on("connect", () => {
    console.log("connection server");
});

// user 입력 데이터(protocol, onflag, usernm)를 소켓 통신으로 받고 console.log 출력
socket.on("req_data", data => {
    console.log('입력 데이터 :: ' , data);
    /***** 장비 modbus 제어 실행 *****/
    modbus_control(data, socket);
});

// 제어가 이뤄졌는지 서버에서 결과 내용 받음
socket.on("control_result", data => {
    console.log(data);
})

socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
        socket.connect();
    }
});