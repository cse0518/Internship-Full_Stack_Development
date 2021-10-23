import db from '../mysql2/index';
import sql from '../mysql2/sql';
import logger from '../winston_logger';
const schedule = require('node-schedule');

require('date-utils');
let newDate = new Date();
let coldate = newDate.toFormat('YYYYMMDDHH24MI05');

let oid = ['301', '302', '303', '304'];

console.log(coldate);

const sensorCheck = (async (err) => {
    if (err) {
        console.log(err);
        logger.info('err : ', err);
    }

    const [rows] = await db.query(sql.selectRecentDate());
    console.log('rows', rows[0].regdate);
    logger.info('DB MAX Date : ', rows[0].regdate);

    if (rows[0].regdate != coldate) {

        console.log('rows :::: ', rows[0].regdate);
        console.log('coldate :::: ', coldate);

        console.log('Sensor Error!');
        logger.info('Sensor Error!');

        const [data] = await db.query(sql.selectFaData(oid[1], 1));
        console.log('data : ', data[0]);

        const [cnt] = await db.query(sql.selectEventList(oid[1], data[0].LOCATIONCD));
        console.log('cnt :: ', cnt.length);

        if (cnt.length <= 0) {
            await db.query(sql.insertEventList(data[0].SKEY, data[0].GKEY, data[0].LOCATIONCD, data[0].SENSORCD, data[0].FACODE, data[0].FALEVEL, data[0].FAMSG, coldate));
            await db.query(sql.updateFaFlag(1, data[0].LOCATIONCD));
        }
    } else {
        const [rows] = await db.query(sql.selectEventList(oid[1], 16));
        await db.query(sql.insertEventHist(rows[0].SKEY, rows[0].GKEY, rows[0].LOCATIONCD, rows[0].SENSORCD, rows[0].FACODE, rows[0].FALEVEL, rows[0].FAMSG, rows[0].GETDATE, coldate));
        await db.query(sql.deleteEventList(rows[0].SKEY, rows[0].GKEY, rows[0].LOCATIONCD, rows[0].SENSORCD, oid[1]));
        await db.query(sql.updateFaFlag(0, rows[0].LOCATIONCD));
    }
});

module.exports = sensorCheck;