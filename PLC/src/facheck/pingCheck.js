var ping = require('ping');
import db from '../mysql/mysql';
import sql from '../mysql/sql';
import logger from '../winston_logger/index';

require('date-utils');
let newDate = new Date();
let coldate = newDate.toFormat('YYYYMMDDHH24MISS');

const pingCheck = () => {

    let oid = ['301', '302', '303', '304'];

    // test host입니다. 192.168.0.15로 하시면 라즈베리파이 ping 확인이 가능합니다.
    var hosts = ['192.168.10.89'];
    logger.info('check HOST : ', hosts);
    hosts.forEach(function (host) {
        ping.sys.probe(host, function (isAlive) {
            try {
                var msg = isAlive ? 'host ' + host + '= alive' : 'host ' + host + '= dead';
                console.log('msg11', msg);
                logger.info('msg : ', msg);

                (async (err) => {
                    if (err) console.log(err);

                    let ch = msg.split('= ');
                    console.log('ch[1] : ', ch[1]);
                    console.log('oid[0] : ', oid[0]);

                    const [device] = await db.query(sql.selectSensor());
                    console.log('device ::: ', device[1]);

                    if (ch[1] === 'dead') {
                        const [data] = await db.query(sql.selectFaData(oid[0], 2));
                        console.log('data : ', data);

                        const [cnt] = await db.query(sql.selectEventList(oid[0], data[0].LOCATIONCD));
                        console.log('cnt :: ', cnt.length);

                        if (cnt.length <= 0) {
                            await db.query(sql.insertEventList(data[0].SKEY, data[0].GKEY, data[0].LOCATIONCD, data[0].SENSORCD, data[0].FACODE, data[0].FALEVEL, data[0].FAMSG, coldate));
                            await db.query(sql.updateFaFlag(1, data[0].LOCATIONCD));
                        }
                        logger.info(`${hosts} is dead!`);

                    } else if (ch[1] === 'alive') {
                        const [rows] = await db.query(sql.selectEventList(oid[0], 16));
                        if (device[1].FLTFLAG === 1) {
                            await db.query(sql.insertEventHist(rows[0].SKEY, rows[0].GKEY, rows[0].LOCATIONCD, rows[0].SENSORCD, rows[0].FACODE, rows[0].FALEVEL, rows[0].FAMSG, rows[0].GETDATE, coldate))
                            await db.query(sql.deleteEventList(rows[0].SKEY, rows[0].GKEY, rows[0].LOCATIONCD, rows[0].SENSORCD, oid[0]));
                            await db.query(sql.updateFaFlag(0, rows[0].LOCATIONCD));
                        }
                        logger.info(`${hosts} is alive!`);
                    }
                    logger.info('pingCheck finish!');
                    // let [rows] = await db.query('select * from nc_f_event_oid_t');
                    // console.log(rows);
                })();
            } catch (error) {
                console.error(error);
                logger.info('pingCheck Fail!');
            }
        });
    });
}
pingCheck();

module.exports = pingCheck;