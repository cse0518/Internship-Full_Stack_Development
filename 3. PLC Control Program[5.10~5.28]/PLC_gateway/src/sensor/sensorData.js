const axios = require('axios');
const { execSync } = require('child_process');
const path = require('path');

const main = () => {
  // 센서 데이터 받아오는 C 소스 실행
  const execFilePath = path.resolve(__dirname, './', 'integrated_B');
  const data = execSync(`${execFilePath} 0`).toString('utf-8');
  console.log(data);

  // server로 센서 데이터 전송
  const sensorData = async (data) => {
    await axios({
      url: "http://192.168.10.89:5000/api/sensorData",
      method: "POST",
      data: JSON.parse(data)
    });
  }

  sensorData(data);
}

main();