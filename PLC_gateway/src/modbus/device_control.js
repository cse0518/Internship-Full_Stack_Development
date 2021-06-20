const ModbusRTU = require('modbus-serial');
const ip = "192.168.10.89";

const ModBusWrite = (req_data, socket, callback) => {
	const client = new ModbusRTU();

	const write = async () => {
		try {
			// 장비 modbus 제어
			const d = await client.writeCoil( req_data.protocol, req_data.onflag == 1 );
			console.log(req_data.devicenm, "제어 시작!");
			
			socket.emit("success", true);
			if (callback) callback(null, d);
		} catch (err) {
			if (callback) callback(err);
		} finally {
			client.close();
		}
	};
	client.connectTCP(ip, { port: 502 }, write);
	client.setID(1);
};

module.exports = ModBusWrite;
