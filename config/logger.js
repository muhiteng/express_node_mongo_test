const winston = require('winston');
require('winston-mongodb');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File(
        { filename: 'error.log',
         level: 'info',
        format:winston.format.combine(winston.format.timestamp(),winston.format.json()) }),
 //   new winston.transports.File({ filename: 'combined.log' }),
 //new winston.transports.Console({ level: 'info'})
 new winston.transports.MongoDB(
    {
     level: 'info',
     options: { useUnifiedTopology: true } ,
     db:'mongodb://localhost/mycompany' }),
  ],
});

module.exports=logger;