const async = require('async');
const dbConnector = require('./db/dbconnector');
const authConnection = require('./db/db');
const modelsList = require('./db/modelsList');

async.series([(callback) => {
    authConnection(dbConnector, (err, data) => {
        if (!err) {
            process.nextTick(callback, null)
        } else {
            process.nextTick(callback, new Error(err))
        }
    })
}, (callback) => {
    dbConnector.sync().then(() => {
        console.log('Database synced');
        process.nextTick(callback, null);
    }).catch((err) => {
        process.nextTick(callback, new Error(err));
    });
}, (callback) => {
    require('./app');
    process.nextTick(callback, null);
}], (err) => {
    console.log(err);
})